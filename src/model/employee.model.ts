import mongoose, { Schema } from "mongoose";
export interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
}
const employeeSchema = new Schema(
  {
    name: {
      type: "string",
      required: [true, "employee name is required"],
    },
    email: {
      type: "string",
      required: [true, "employee email is required"],
    },
    password: {
      type: "string",
      required: [true, "employee password is required"],
    },
  },
  {
    timestamps: true,
  }
);
export const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);
