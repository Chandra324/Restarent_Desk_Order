const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Customer = require('../models/Customer');
const MenuItem = require('../models/MenuItem');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant_pos');
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});

    const users = [
      {
        name: 'Admin User',
        email: 'admin@restaurant.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        name: 'Manager User',
        email: 'manager@restaurant.com',
        password: 'manager123',
        role: 'manager'
      },
      {
        name: 'Cashier User',
        email: 'cashier@restaurant.com',
        password: 'cashier123',
        role: 'cashier'
      }
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const seedCustomers = async () => {
  try {
    // Clear existing customers
    await Customer.deleteMany({});

    const customers = [
      {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1234567890',
        address: '123 Main St, City, State 12345'
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+1234567891',
        address: '456 Oak Ave, City, State 12345'
      },
      {
        name: 'Bob Johnson',
        email: 'bob.johnson@email.com',
        phone: '+1234567892',
        address: '789 Pine Rd, City, State 12345'
      },
      {
        name: 'Alice Brown',
        email: 'alice.brown@email.com',
        phone: '+1234567893',
        address: '321 Elm St, City, State 12345'
      },
      {
        name: 'Charlie Wilson',
        email: 'charlie.wilson@email.com',
        phone: '+1234567894',
        address: '654 Maple Dr, City, State 12345'
      }
    ];

    await Customer.insertMany(customers);
    console.log('Customers seeded successfully');
  } catch (error) {
    console.error('Error seeding customers:', error);
  }
};

const seedMenuItems = async () => {
  try {
    // Clear existing menu items
    await MenuItem.deleteMany({});

    const menuItems = [
      // Appetizers
      {
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese',
        price: 8.99,
        category: 'Appetizer',
        preparationTime: 10,
        ingredients: ['romaine lettuce', 'caesar dressing', 'croutons', 'parmesan cheese'],
        isAvailable: true
      },
      {
        name: 'Buffalo Wings',
        description: 'Spicy chicken wings served with blue cheese dip',
        price: 12.99,
        category: 'Appetizer',
        preparationTime: 15,
        ingredients: ['chicken wings', 'buffalo sauce', 'blue cheese', 'celery'],
        isAvailable: true
      },
      {
        name: 'Mozzarella Sticks',
        description: 'Golden fried mozzarella sticks with marinara sauce',
        price: 9.99,
        category: 'Appetizer',
        preparationTime: 12,
        ingredients: ['mozzarella cheese', 'breadcrumbs', 'marinara sauce'],
        isAvailable: true
      },

      // Main Courses
      {
        name: 'Classic Burger',
        description: 'Juicy beef patty with lettuce, tomato, cheese, and our special sauce',
        price: 14.99,
        category: 'Main Course',
        preparationTime: 20,
        ingredients: ['beef patty', 'lettuce', 'tomato', 'cheese', 'burger bun', 'special sauce'],
        isAvailable: true
      },
      {
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, and basil on thin crust',
        price: 16.99,
        category: 'Main Course',
        preparationTime: 25,
        ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'basil'],
        isAvailable: true
      },
      {
        name: 'Grilled Salmon',
        description: 'Atlantic salmon grilled to perfection with lemon herb seasoning',
        price: 22.99,
        category: 'Main Course',
        preparationTime: 18,
        ingredients: ['salmon fillet', 'lemon', 'herbs', 'olive oil'],
        isAvailable: true
      },
      {
        name: 'Chicken Alfredo',
        description: 'Creamy alfredo pasta with grilled chicken breast',
        price: 18.99,
        category: 'Main Course',
        preparationTime: 22,
        ingredients: ['fettuccine pasta', 'chicken breast', 'alfredo sauce', 'parmesan'],
        isAvailable: true
      },
      {
        name: 'BBQ Ribs',
        description: 'Slow-cooked pork ribs with our signature BBQ sauce',
        price: 24.99,
        category: 'Main Course',
        preparationTime: 30,
        ingredients: ['pork ribs', 'BBQ sauce', 'spices'],
        isAvailable: true
      },

      // Desserts
      {
        name: 'Chocolate Cake',
        description: 'Rich chocolate layer cake with chocolate frosting',
        price: 6.99,
        category: 'Dessert',
        preparationTime: 5,
        ingredients: ['chocolate cake', 'chocolate frosting', 'cocoa powder'],
        isAvailable: true
      },
      {
        name: 'Cheesecake',
        description: 'New York style cheesecake with berry compote',
        price: 7.99,
        category: 'Dessert',
        preparationTime: 5,
        ingredients: ['cream cheese', 'graham cracker crust', 'berry compote'],
        isAvailable: true
      },
      {
        name: 'Ice Cream Sundae',
        description: 'Vanilla ice cream with chocolate sauce, whipped cream, and cherry',
        price: 5.99,
        category: 'Dessert',
        preparationTime: 8,
        ingredients: ['vanilla ice cream', 'chocolate sauce', 'whipped cream', 'cherry'],
        isAvailable: true
      },

      // Beverages
      {
        name: 'Coca Cola',
        description: 'Classic Coca Cola soft drink',
        price: 2.99,
        category: 'Beverage',
        preparationTime: 2,
        ingredients: ['coca cola'],
        isAvailable: true
      },
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 4.99,
        category: 'Beverage',
        preparationTime: 5,
        ingredients: ['fresh oranges'],
        isAvailable: true
      },
      {
        name: 'Coffee',
        description: 'Freshly brewed coffee',
        price: 3.99,
        category: 'Beverage',
        preparationTime: 5,
        ingredients: ['coffee beans', 'water'],
        isAvailable: true
      },
      {
        name: 'Iced Tea',
        description: 'Refreshing iced tea with lemon',
        price: 3.49,
        category: 'Beverage',
        preparationTime: 3,
        ingredients: ['tea', 'ice', 'lemon'],
        isAvailable: true
      }
    ];

    await MenuItem.insertMany(menuItems);
    console.log('Menu items seeded successfully');
  } catch (error) {
    console.error('Error seeding menu items:', error);
  }
};

const seedAll = async () => {
  await connectDB();
  
  console.log('Starting database seeding...');
  
  await seedUsers();
  await seedCustomers();
  await seedMenuItems();
  
  console.log('Database seeding completed!');
  process.exit(0);
};

seedAll();