//////////////////////////////////////////////////////////////////
export interface AuthRequest extends Request {
  userPayload: {
    userId: string;
    email: string;
  };
}

import Address from "../models/Address";
import User from "../models/User";

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
