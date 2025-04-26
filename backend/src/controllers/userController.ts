import { Request, Response } from "express";
import Address from "../models/Address";
import User from "../models/User";
import { UpdateProfile } from "../types/ProfileBody";

//////////////////////////////////////////////////////////////////
export interface AuthRequest extends Request<{}, {}, UpdateProfile> {
  userPayload: {
    userId: string;
    email: string;
  };
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userPayload.userId;
    const user = await User.findById(userId).select("email name phone");
    const addresses = await Address.find({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
      addresses,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile", details: error });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userPayload.userId;
    const { name, phone, address } = req.body;
    // 1. Update user basic info
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone },
      { new: true, runValidators: true }
    ).select("email name phone");
    // 2. If address provided, update or create it
    if (address) {
      const { _id, ...addressData } = address;
      if (_id) {
        await Address.findOneAndUpdate({ _id, userId }, addressData, {
          new: true,
          runValidators: true,
        });
      } else {
        // add new address
        await Address.create({ ...addressData, userId });
      }
    }
    //  Fetch update addresses
    const addresses = await Address.find({ userId });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      addresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update profile",
      details: (error as any).message,
    });
  }
};

export const deleteProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userPayload.userId;
    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Delete user
    user?.deleteOne();
    // Delete user's addresses
    await Address.deleteMany();
    return res.status(200).json({
      message: "User Deleted successfully",
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete user", details: error.message });
  }
};
