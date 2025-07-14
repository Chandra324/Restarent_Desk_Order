const express = require('express');
const { body, validationResult } = require('express-validator');
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { category, search, available, page = 1, limit = 20 } = req.query;
    const query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by availability
    if (available !== undefined) {
      query.isAvailable = available === 'true';
    }

    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const menuItems = await MenuItem.find(query)
      .sort({ category: 1, name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await MenuItem.countDocuments(query);

    res.json({
      success: true,
      data: menuItems,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching menu items'
    });
  }
});

// @route   GET /api/menu/categories
// @desc    Get all menu categories
// @access  Private
router.get('/categories', auth, async (req, res) => {
  try {
    const categories = await MenuItem.distinct('category');
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
});



// @route   POST /api/menu
// @desc    Create new menu item
// @access  Private
router.post('/', auth, [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isIn(['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Special']).withMessage('Invalid category'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
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

    const menuItem = await MenuItem.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: menuItem
    });
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating menu item'
    });
  }
});

// @route   PUT /api/menu/:id
// @desc    Update menu item
// @access  Private
router.put('/:id', auth, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').optional().isIn(['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Special']).withMessage('Invalid category'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
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

    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.json({
      success: true,
      message: 'Menu item updated successfully',
      data: menuItem
    });
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating menu item'
    });
  }
});

// @route   DELETE /api/menu/:id
// @desc    Delete menu item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting menu item'
    });
  }
});
router.get('/popular', auth, async (req, res) => {
  try {
    const topItems = await MenuItem.find()
      .sort({ popularity: -1 })
      .limit(10);

    res.json({
      success: true,
      data: topItems
    });
  } catch (error) {
    console.error('Get popular menu items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching popular items'
    });
  }
});


// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching menu item'
    });
  }
});
module.exports = router;