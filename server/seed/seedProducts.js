import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import products from './products.data.js';

dotenv.config();
connectDB();

const adminUser = {
  name: 'ShopSphere Admin',
  email: 'admin@shopsphere.com',
  password: 'admin12345',
  role: 'admin',
};

const importData = async () => {
  try {
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await User.create(adminUser);
    await Product.insertMany(products);

    console.log('✅ Demo data imported successfully!');
    console.log('   Admin login -> email: admin@shopsphere.com | password: admin12345');
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️  All data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
