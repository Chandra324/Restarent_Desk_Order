const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, customer, page = 1, limit = 20, startDate, endDate } = req.query;
    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by customer
    if (customer) {
      query.customer = customer;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(query)
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email phone address')
      .populate('items.menuItem', 'name category');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, [
  body('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
  body('items.*.menuItem').isMongoId().withMessage('Invalid menu item ID'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('subtotal').isFloat({ min: 0 }).withMessage('Subtotal must be a positive number'),
  body('tax').isFloat({ min: 0 }).withMessage('Tax must be a positive number'),
  body('total').isFloat({ min: 0 }).withMessage('Total must be a positive number'),
  body('paymentMethod').isIn(['cash', 'card', 'digital']).withMessage('Invalid payment method'),
  body('orderType').optional().isIn(['dine-in', 'takeaway', 'delivery']).withMessage('Invalid order type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      customer,
      items,
      subtotal,
      tax,
      discount = 0,
      total,
      paymentMethod,
      orderType = 'dine-in',
      tableNumber,
      notes
    } = req.body;

    // Validate customer if provided
    if (customer) {
      const customerExists = await Customer.findById(customer);
      if (!customerExists) {
        return res.status(400).json({
          success: false,
          message: 'Customer not found'
        });
      }
    }

    // Validate menu items and calculate estimated time
    let estimatedTime = 0;
    const validatedItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(400).json({
          success: false,
          message: `Menu item not found: ${item.menuItem}`
        });
      }

      if (!menuItem.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `Menu item not available: ${menuItem.name}`
        });
      }

      validatedItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions
      });

      estimatedTime = Math.max(estimatedTime, menuItem.preparationTime);
    }
const generateOrderNumber = async () => {
  const count = await Order.countDocuments();
  const nextNumber = count + 1;
  return `ORD-${nextNumber.toString().padStart(5, '0')}`;  // Example: ORD-00001
};
const orderNumber = await generateOrderNumber();
    // Create order
    const order = await Order.create({
      customer,
      orderNumber,
      items: validatedItems,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      orderType,
      tableNumber,
      notes,
      estimatedTime,
      paymentStatus: paymentMethod === 'cash' ? 'paid' : 'pending'
    });

    // Update customer statistics if customer is provided
    if (customer) {
      await Customer.findByIdAndUpdate(customer, {
        $inc: { totalOrders: 1, totalSpent: total },
        lastOrderDate: new Date()
      });
    }

    // Update menu item popularity
    for (const item of validatedItems) {
      await MenuItem.findByIdAndUpdate(item.menuItem, {
        $inc: { popularity: item.quantity }
      });
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('customer', 'name email phone')
      .populate('items.menuItem', 'name category');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: populatedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', auth, [
  body('status').isIn(['pending', 'preparing', 'ready', 'completed', 'cancelled']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status } = req.body;
    const updateData = { status };

    // Set completion time if order is completed
    if (status === 'completed') {
      updateData.completedAt = new Date();
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('customer', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
});

// @route   GET /api/orders/stats/summary
// @desc    Get order statistics
// @access  Private
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = {};

    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }

    const stats = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      completedOrders: 0,
      cancelledOrders: 0
    };

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order statistics'
    });
  }
});
// @route   GET /api/orders/stats/daily
// @desc    Get daily sales (grouped by date)
// @access  Private
router.get('/stats/daily', auth, async (req, res) => {
  try {
    console.log("----")
    const stats = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalSales: { $sum: "$total" },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formatted = stats.map(item => ({
      date: item._id,
      totalSales: item.totalSales,
      orderCount: item.orderCount
    }));

    res.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    console.error('Daily sales error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching daily sales'
    });
  }
});
// @route   GET /api/menu/popular
// @desc    Get most popular menu items based on order quantity
// @access  Private
router.get('/popular', auth, async (req, res) => {
  try {
    const popularItems = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.menuItem",
          totalOrdered: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalOrdered: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "menuitems", // make sure collection name is lowercase and plural
          localField: "_id",
          foreignField: "_id",
          as: "menuItem"
        }
      },
      { $unwind: "$menuItem" },
      {
        $project: {
          _id: 0,
          id: "$menuItem._id",
          name: "$menuItem.name",
          category: "$menuItem.category",
          totalOrdered: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: popularItems
    });
  } catch (error) {
    console.error('Popular items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching popular items'
    });
  }
});

module.exports = router;