var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose
            .connect(process.env.MONGO_URL)
            .then(() => console.log(`#  Connected To MDB | pid:${process.pid} | Host:${mongoose.connection.host} | http://localhost:8081`));
    }
    catch (error) {
        console.log(`${error}`);
    }
});