
// import { IUser } from "./user.dto";
// import UserSchema from "./user.schema";
import {IAdmin} from "./admin.dto"
import {Admin} from "./admin.schema"
export const adminLogin = async (data: IAdmin) => {
    const result = await Admin.create({ ...data, active: true });
    return result;
};

// export const updateUser = async (id: string, data: IUser) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
//         new: true,
//     });
//     return result;
// };

// export const editUser = async (id: string, data: Partial<IUser>) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
//     return result;
// };

// export const deleteUser = async (id: string) => {
//     const result = await UserSchema.deleteOne({ _id: id });
//     return result;
// };

// export const getUserById = async (id: string) => {
//     const result = await UserSchema.findById(id).lean();
//     return result;
// };

// export const getAllUser = async () => {
//     const result = await UserSchema.find({}).lean();
//     return result;
// };
// export const getUserByEmail = async (email: string) => {
//     const result = await UserSchema.findOne({ email }).lean();
//     return result;
// }

