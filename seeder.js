import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/categoryModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

// Sample categories
const categories = [
  { name: 'Electronics' },
  { name: 'Fashion' },
  { name: 'Home & Kitchen' },
  { name: 'Books' },
  { name: 'Sports & Outdoors' },
  { name: 'Beauty & Personal Care' },
  { name: 'Toys & Games' }
];

// Function to import data
const importData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    
    console.log('Data cleared...');
    
    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories added...');
    
    // Sample products
    const products = [
      // Electronics Category
      {
        name: 'MacBook Pro M2',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60',
        description: 'The latest MacBook Pro with M2 chip, featuring incredible performance and battery life.',
        brand: 'Apple',
        category: createdCategories[0]._id, // Electronics
        price: 1299.99,
        countInStock: 15,
        rating: 4.9,
        numReviews: 12,
        quantity: 20
      },
      {
        name: 'iPhone 15 Pro',
        image: 'https://images.unsplash.com/photo-1703434123142-1b41a1b1055b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGlwaG9uZSUyMDE1fGVufDB8fDB8fHww',
        description: 'The most advanced iPhone ever with A17 Pro chip and a stunning camera system.',
        brand: 'Apple',
        category: createdCategories[0]._id, // Electronics
        price: 999.99,
        countInStock: 20,
        rating: 4.8,
        numReviews: 8,
        quantity: 25
      },
      {
        name: 'Sony WH-1000XM4',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&auto=format&fit=crop&q=60',
        description: 'Industry-leading noise cancelling headphones with premium sound quality.',
        brand: 'Sony',
        category: createdCategories[0]._id, // Electronics
        price: 349.99,
        countInStock: 25,
        rating: 4.7,
        numReviews: 10,
        quantity: 30
      },
      {
        name: 'Samsung 4K QLED TV',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=60',
        description: 'Ultra HD Smart TV with Quantum Dot technology for vibrant colors and deep blacks.',
        brand: 'Samsung',
        category: createdCategories[0]._id, // Electronics
        price: 799.99,
        countInStock: 10,
        rating: 4.6,
        numReviews: 14,
        quantity: 12
      },
      {
        name: 'Gaming Laptop',
        image: 'https://images.unsplash.com/photo-1603481546238-487240415921?w=600&auto=format&fit=crop&q=60',
        description: 'High-performance gaming laptop with RTX 4070 graphics and 16GB RAM.',
        brand: 'Asus',
        category: createdCategories[0]._id, // Electronics
        price: 1499.99,
        countInStock: 8,
        rating: 4.8,
        numReviews: 17,
        quantity: 10
      },
      {
        name: 'Wireless Earbuds',
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&auto=format&fit=crop&q=60',
        description: 'True wireless earbuds with active noise cancellation and 24-hour battery life.',
        brand: 'Samsung',
        category: createdCategories[0]._id, // Electronics
        price: 149.99,
        countInStock: 30,
        rating: 4.5,
        numReviews: 22,
        quantity: 35
      },
      
      // Fashion Category
      {
        name: 'Premium Leather Jacket',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=60',
        description: 'High-quality leather jacket, perfect for all seasons. Stylish and durable.',
        brand: 'Levi\'s',
        category: createdCategories[1]._id, // Fashion
        price: 199.99,
        countInStock: 30,
        rating: 4.5,
        numReviews: 6,
        quantity: 15
      },
      {
        name: 'Running Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60',
        description: 'Lightweight and comfortable running shoes with excellent support.',
        brand: 'Nike',
        category: createdCategories[1]._id, // Fashion
        price: 129.99,
        countInStock: 35,
        rating: 4.7,
        numReviews: 9,
        quantity: 40
      },
      {
        name: 'Designer Sunglasses',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=60',
        description: 'Stylish UV-protected sunglasses with polarized lenses and durable frame.',
        brand: 'Ray-Ban',
        category: createdCategories[1]._id, // Fashion
        price: 159.99,
        countInStock: 25,
        rating: 4.6,
        numReviews: 13,
        quantity: 30
      },
      {
        name: 'Casual Denim Jeans',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60',
        description: 'Classic fit denim jeans with stretch technology for maximum comfort.',
        brand: 'Levi\'s',
        category: createdCategories[1]._id, // Fashion
        price: 79.99,
        countInStock: 40,
        rating: 4.4,
        numReviews: 18,
        quantity: 45
      },
      {
        name: 'Luxury Wristwatch',
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=60',
        description: 'Elegant automatic wristwatch with sapphire crystal and stainless steel band.',
        brand: 'Fossil',
        category: createdCategories[1]._id, // Fashion
        price: 249.99,
        countInStock: 15,
        rating: 4.8,
        numReviews: 11,
        quantity: 20
      },
      
      // Home & Kitchen Category
      {
        name: 'Smart Coffee Maker',
        image: 'https://images.unsplash.com/photo-1603999684548-0002fd13a45d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Programmable coffee maker with smartphone control and multiple brewing options.',
        brand: 'Philips',
        category: createdCategories[2]._id, // Home & Kitchen
        price: 79.99,
        countInStock: 25,
        rating: 4.4,
        numReviews: 7,
        quantity: 20
      },
      {
        name: 'Air Fryer',
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=60',
        description: 'Digital air fryer with 6 cooking presets and non-stick basket for healthier meals.',
        brand: 'Ninja',
        category: createdCategories[2]._id, // Home & Kitchen
        price: 119.99,
        countInStock: 20,
        rating: 4.7,
        numReviews: 16,
        quantity: 25
      },
      {
        name: 'Robot Vacuum Cleaner',
        image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=600&auto=format&fit=crop&q=60',
        description: 'Smart robot vacuum with mapping technology, app control, and automatic recharging.',
        brand: 'iRobot',
        category: createdCategories[2]._id, // Home & Kitchen
        price: 299.99,
        countInStock: 12,
        rating: 4.6,
        numReviews: 19,
        quantity: 15
      },
      {
        name: 'Luxury Bedding Set',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=60',
        description: '100% Egyptian cotton bedding set with duvet cover, fitted sheet, and pillowcases.',
        brand: 'Brooklinen',
        category: createdCategories[2]._id, // Home & Kitchen
        price: 149.99,
        countInStock: 18,
        rating: 4.9,
        numReviews: 21,
        quantity: 20
      },
      
      // Books Category
      {
        name: 'Bestseller Book Set',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=60',
        description: 'Collection of award-winning novels from top authors around the world.',
        brand: 'Penguin',
        category: createdCategories[3]._id, // Books
        price: 99.99,
        countInStock: 25,
        rating: 4.9,
        numReviews: 15,
        quantity: 30
      },
      {
        name: 'Self-Development Book',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=60',
        description: 'Bestselling self-help book on personal growth, productivity, and mindfulness.',
        brand: 'Harper Collins',
        category: createdCategories[3]._id, // Books
        price: 24.99,
        countInStock: 35,
        rating: 4.7,
        numReviews: 27,
        quantity: 40
      },
      {
        name: 'Cookbook Collection',
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&auto=format&fit=crop&q=60',
        description: 'Set of 3 cookbooks featuring recipes from around the world with step-by-step instructions.',
        brand: 'Random House',
        category: createdCategories[3]._id, // Books
        price: 59.99,
        countInStock: 20,
        rating: 4.8,
        numReviews: 14,
        quantity: 25
      },
      
      // Sports & Outdoors Category
      {
        name: 'Yoga Mat',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=60',
        description: 'Premium non-slip yoga mat, perfect for all types of yoga practices.',
        brand: 'Lululemon',
        category: createdCategories[4]._id, // Sports & Outdoors
        price: 29.99,
        countInStock: 40,
        rating: 4.6,
        numReviews: 11,
        quantity: 50
      },
      {
        name: 'Mountain Bike',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=60',
        description: 'All-terrain mountain bike with 21 speeds, front suspension, and disc brakes.',
        brand: 'Trek',
        category: createdCategories[4]._id, // Sports & Outdoors
        price: 599.99,
        countInStock: 8,
        rating: 4.8,
        numReviews: 13,
        quantity: 10
      },
      {
        name: 'Tennis Racket',
        image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
        description: 'Professional tennis racket with carbon fiber frame and optimal string tension.',
        brand: 'Wilson',
        category: createdCategories[4]._id, // Sports & Outdoors
        price: 149.99,
        countInStock: 15,
        rating: 4.7,
        numReviews: 9,
        quantity: 20
      },
      {
        name: 'Camping Tent',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=60',
        description: 'Waterproof 4-person camping tent with easy setup and storage pockets.',
        brand: 'Coleman',
        category: createdCategories[4]._id, // Sports & Outdoors
        price: 129.99,
        countInStock: 12,
        rating: 4.5,
        numReviews: 16,
        quantity: 15
      },

      // Beauty & Personal Care Category
      {
        name: 'Premium Skincare Set',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=60',
        description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer for radiant skin.',
        brand: 'The Ordinary',
        category: createdCategories[5]._id, // Beauty & Personal Care
        price: 89.99,
        countInStock: 25,
        rating: 4.8,
        numReviews: 32,
        quantity: 30
      },
      {
        name: 'Luxury Perfume',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=60',
        description: 'Elegant fragrance with notes of jasmine, vanilla, and sandalwood for a lasting impression.',
        brand: 'Chanel',
        category: createdCategories[5]._id, // Beauty & Personal Care
        price: 129.99,
        countInStock: 15,
        rating: 4.9,
        numReviews: 24,
        quantity: 20
      },
      {
        name: 'Professional Hair Dryer',
        image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600&auto=format&fit=crop&q=60',
        description: 'Salon-quality hair dryer with ionic technology for faster drying and reduced frizz.',
        brand: 'Dyson',
        category: createdCategories[5]._id, // Beauty & Personal Care
        price: 249.99,
        countInStock: 10,
        rating: 4.7,
        numReviews: 18,
        quantity: 12
      },
      {
        name: 'Organic Makeup Set',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=60',
        description: 'Complete makeup collection with natural ingredients, cruelty-free and suitable for sensitive skin.',
        brand: 'Bare Minerals',
        category: createdCategories[5]._id, // Beauty & Personal Care
        price: 79.99,
        countInStock: 20,
        rating: 4.6,
        numReviews: 29,
        quantity: 25
      },

      // Toys & Games Category
      {
        name: 'Building Blocks Set',
        image: 'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?w=800&auto=format&fit=crop&q=80',
        description: 'Creative building blocks with 500+ pieces for endless construction possibilities.',
        brand: 'LEGO',
        category: createdCategories[6]._id, // Toys & Games
        price: 49.99,
        countInStock: 30,
        rating: 4.9,
        numReviews: 42,
        quantity: 35
      },
      {
        name: 'Strategy Board Game',
        image: 'https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Engaging strategy game for 2-6 players with multiple paths to victory.',
        brand: 'Hasbro',
        category: createdCategories[6]._id, // Toys & Games
        price: 39.99,
        countInStock: 25,
        rating: 4.8,
        numReviews: 36,
        quantity: 30
      },
      {
        name: 'Remote Control Car',
        image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&auto=format&fit=crop&q=80',
        description: 'High-speed RC car with all-terrain capabilities and rechargeable battery.',
        brand: 'Traxxas',
        category: createdCategories[6]._id, // Toys & Games
        price: 89.99,
        countInStock: 15,
        rating: 4.7,
        numReviews: 22,
        quantity: 18
      },
      {
        name: 'Educational Science Kit',
        image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Hands-on science experiments for children to learn about chemistry, physics, and biology.',
        brand: 'National Geographic',
        category: createdCategories[6]._id, // Toys & Games
        price: 34.99,
        countInStock: 20,
        rating: 4.6,
        numReviews: 19,
        quantity: 25
      },

      // Additional Electronics Products
      {
        name: 'Smart Watch',
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Fitness tracking smartwatch with heart rate monitor, sleep tracking, and smartphone notifications.',
        brand: 'Fitbit',
        category: createdCategories[0]._id, // Electronics
        price: 179.99,
        countInStock: 18,
        rating: 4.5,
        numReviews: 24,
        quantity: 20
      },
      {
        name: 'Portable Bluetooth Speaker',
        image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Waterproof portable speaker with 20-hour battery life and deep bass sound.',
        brand: 'JBL',
        category: createdCategories[0]._id, // Electronics
        price: 99.99,
        countInStock: 25,
        rating: 4.6,
        numReviews: 38,
        quantity: 30
      },

      // Additional Fashion Products
      {
        name: 'Winter Jacket',
        image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Insulated winter jacket with water-resistant outer shell and warm fleece lining.',
        brand: 'North Face',
        category: createdCategories[1]._id, // Fashion
        price: 199.99,
        countInStock: 15,
        rating: 4.8,
        numReviews: 16,
        quantity: 20
      },
      {
        name: 'Leather Handbag',
        image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Elegant genuine leather handbag with multiple compartments and adjustable strap.',
        brand: 'Coach',
        category: createdCategories[1]._id, // Fashion
        price: 149.99,
        countInStock: 12,
        rating: 4.7,
        numReviews: 22,
        quantity: 15
      },

      // Additional Home & Kitchen Products
      {
        name: 'Stand Mixer',
        image: 'https://images.pexels.com/photos/4197439/pexels-photo-4197439.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Professional stand mixer with 10 speed settings and multiple attachments for various cooking tasks.',
        brand: 'KitchenAid',
        category: createdCategories[2]._id, // Home & Kitchen
        price: 299.99,
        countInStock: 10,
        rating: 4.9,
        numReviews: 45,
        quantity: 12
      },
      {
        name: 'Non-Stick Cookware Set',
        image: 'https://images.pexels.com/photos/5825371/pexels-photo-5825371.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: '10-piece non-stick cookware set including pots, pans, and lids with heat-resistant handles.',
        brand: 'Calphalon',
        category: createdCategories[2]._id, // Home & Kitchen
        price: 149.99,
        countInStock: 20,
        rating: 4.6,
        numReviews: 28,
        quantity: 25
      },

      // Additional Books Products
      {
        name: 'Fiction Bestseller Collection',
        image: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Collection of five award-winning fiction novels from contemporary authors.',
        brand: 'Penguin Random House',
        category: createdCategories[3]._id, // Books
        price: 79.99,
        countInStock: 30,
        rating: 4.8,
        numReviews: 32,
        quantity: 35
      },
      {
        name: 'Business Leadership Book',
        image: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Bestselling business book on leadership principles and management strategies.',
        brand: 'Simon & Schuster',
        category: createdCategories[3]._id, // Books
        price: 29.99,
        countInStock: 40,
        rating: 4.7,
        numReviews: 56,
        quantity: 45
      },

      // Additional Sports & Outdoors Products
      {
        name: 'Hiking Backpack',
        image: 'https://images.pexels.com/photos/1178523/pexels-photo-1178523.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Durable 50L hiking backpack with hydration system compatibility and multiple compartments.',
        brand: 'North Face',
        category: createdCategories[4]._id, // Sports & Outdoors
        price: 129.99,
        countInStock: 18,
        rating: 4.6,
        numReviews: 29,
        quantity: 20
      },
      {
        name: 'Fitness Resistance Bands',
        image: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Set of 5 resistance bands with different strength levels for home workouts and physical therapy.',
        brand: 'TheraBand',
        category: createdCategories[4]._id, // Sports & Outdoors
        price: 24.99,
        countInStock: 35,
        rating: 4.5,
        numReviews: 42,
        quantity: 40
      },

      // Additional Beauty & Personal Care Products
      {
        name: 'Electric Toothbrush',
        image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Rechargeable sonic toothbrush with multiple cleaning modes and pressure sensor.',
        brand: 'Oral-B',
        category: createdCategories[5]._id, // Beauty & Personal Care
        price: 89.99,
        countInStock: 22,
        rating: 4.7,
        numReviews: 34,
        quantity: 25
      },
      {
        name: 'Men\'s Grooming Kit',
        image: 'https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Complete grooming kit with beard trimmer, razor, and skincare products for men.',
        brand: 'Philips',
        category: createdCategories[5]._id, // Beauty & Personal Care
        price: 69.99,
        countInStock: 18,
        rating: 4.5,
        numReviews: 26,
        quantity: 20
      },

      // Additional Toys & Games Products
      {
        name: 'Drone with Camera',
        image: 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Remote-controlled drone with HD camera, 25-minute flight time, and automatic return feature.',
        brand: 'DJI',
        category: createdCategories[6]._id, // Toys & Games
        price: 299.99,
        countInStock: 10,
        rating: 4.8,
        numReviews: 18,
        quantity: 12
      },
      {
        name: 'Puzzle Set',
        image: 'https://images.pexels.com/photos/3491940/pexels-photo-3491940.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Collection of 4 jigsaw puzzles with 1000 pieces each, featuring beautiful landscape scenes.',
        brand: 'Ravensburger',
        category: createdCategories[6]._id, // Toys & Games
        price: 49.99,
        countInStock: 25,
        rating: 4.6,
        numReviews: 32,
        quantity: 30
      }
    ];
    
    // Insert products
    await Product.insertMany(products);
    console.log('Products added...');
    
    console.log('Data import successful!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();
    
    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the appropriate function based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
