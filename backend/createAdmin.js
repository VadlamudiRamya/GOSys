const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const email = 'admin@gosys.com';
    const password = 'adminpassword123';
    const role = 'admin';

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    const user = await User.create({
      email,
      password,
      role,
    });

    if (user) {
      console.log('Admin user created successfully');
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      console.log('Invalid user data');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
