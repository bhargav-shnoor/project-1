const mongoose = require('mongoose');
const connectDB = async () => {
 try {
   const conn = await mongoose.connect(process.env.MONGO_URI);
   console.log(`db connected: ${conn.connection.host}`);
 } catch (err) {
   console.log('db conn failed:', err.message);
   process.exit(1);
 }
};
module.exports = connectDB;