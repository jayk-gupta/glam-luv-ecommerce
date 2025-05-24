"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.getProfile = void 0;
const Address_1 = __importDefault(require("../models/Address"));
const User_1 = __importDefault(require("../models/User"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userPayload.userId;
        const user = yield User_1.default.findById(userId).select("email name phone");
        const addresses = yield Address_1.default.find({ userId });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({
            user: {
                email: user.email,
                name: user.name,
                phone: user.phone,
            },
            addresses,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch profile", details: error });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userPayload.userId;
        const { name, phone, address } = req.body;
        console.log(address);
        // 1. Update user basic info
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { name, phone }, { new: true, runValidators: true }).select("email name phone");
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // 2. If address provided, update or create it
        if (address) {
            const { _id } = address, addressData = __rest(address, ["_id"]);
            if (_id) {
                // Update existing address
                yield Address_1.default.findOneAndUpdate({ _id, userId }, Object.assign({}, addressData), { new: true, runValidators: true });
            }
            else {
                // Create new address
                const res = yield Address_1.default.create(Object.assign(Object.assign({}, addressData), { userId }));
                console.log("res:" + res);
            }
        }
        // 3. Fetch updated addresses
        const addresses = yield Address_1.default.find({ userId });
        console.log("addresses:" + addresses);
        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            addresses,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Failed to update profile",
            details: error.message,
        });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userPayload.userId;
        // Find user
        const user = yield User_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // Delete user
        yield (user === null || user === void 0 ? void 0 : user.deleteOne());
        // Delete user's addresses
        yield Address_1.default.deleteMany();
        // ✅ Clear the httpOnly token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // keep it same as when you set cookie
            sameSite: "lax",
        });
        return res.status(200).json({
            message: "User Deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Failed to delete user", details: error.message });
    }
});
exports.deleteProfile = deleteProfile;
