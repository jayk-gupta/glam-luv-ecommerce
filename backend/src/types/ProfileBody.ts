export interface UpdateProfile {
  name?: string;
  phone?: string;
  address?: {
    _id: string
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    isDefault?: boolean;
  };
}
