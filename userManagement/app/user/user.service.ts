import { IUser } from "./user.dto";
import { User } from "./user.schema";

export const createUser = async (data: IUser) => {
  const result = await User.create({ ...data, active: true });
  return result;
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, data, {
    new: true, // Return the updated document
  });
  return result;
};

export const editUser = async (id: string, data: Partial<IUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, data, {
    new: true, // Return the updated document
  });
  return result;
};

export const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};

export const getUserById = async (id: string) => {
  const result = await User.findById(id).lean(); // Use `lean` for plain JavaScript objects
  return result;
};

export const getAllUsers = async () => {
  const result = await User.find({}).lean();
  return result;
};

export const getUserByEmail = async (email: string) => {
  const result = await User.findOne({ email }).lean();
  return result;
};
