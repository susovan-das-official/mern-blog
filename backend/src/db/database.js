import mongoose, { connect } from "mongoose";
export const connectionDB = async () => {
  try {
    const connectionInstance = await connect(process.env.MONGO_URI);
    console.log(`MONGODB CONNECTED: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`MONGODB CONNECTION ERROR: ${error.message}`);
    process.exit(1);
  }
};
