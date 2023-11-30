import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongoConnect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL!)
      .then(() =>
        console.log(
          `#  Connected To MDB | pid:${process.pid} | Host:${mongoose.connection.host} | http://localhost:8081`
        )
      );
  } catch (error) {
    console.log(`${error}`);
  }
};
