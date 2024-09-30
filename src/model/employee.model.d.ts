import mongoose from "mongoose";
export interface IEmployee extends Document {
    name: string;
    email: string;
    password: string;
}
export declare const Employee: mongoose.Model<IEmployee, {}, {}, {}, mongoose.Document<unknown, {}, IEmployee> & IEmployee & {
    _id: mongoose.Types.ObjectId;
}, any>;
