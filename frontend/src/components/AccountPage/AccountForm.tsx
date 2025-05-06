import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
import { formSchema, FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import {
  useDeleteUserProfileMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/user/userAPI";

import { Button } from "../ui/button";
import { FormInput } from "../ui/custom/FormInput";
import { useClearCartMutation } from "@/redux/cart/cartAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AccountForm() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: userData } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [deleteProfile, { isLoading: isDeleting }] =
    useDeleteUserProfileMutation();
  // cart
  const [ clearCart ] = useClearCartMutation();
  // form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.user?.name || "",
      phone: userData?.user?.phone || "",
      address: {
        _id: userData?.addresses?.[0]?._id || "",
        fullName: userData?.addresses?.[0]?.fullName || "",
        phone: userData?.addresses?.[0]?.phone || "",
        street: userData?.addresses?.[0]?.street || "",
        city: userData?.addresses?.[0]?.city || "",
        state: userData?.addresses?.[0]?.state || "",
        country: userData?.addresses?.[0]?.country || "",
        pincode: userData?.addresses?.[0]?.pincode || "",
      },
    },
    values: {
      // ensures form gets updated with API data
      name: userData?.user?.name || "",
      phone: userData?.user?.phone || "",
      address: {
        _id: userData?.addresses?.[0]?._id || "",
        fullName: userData?.addresses?.[0]?.fullName || "",
        phone: userData?.addresses?.[0]?.phone || "",
        street: userData?.addresses?.[0]?.street || "",
        city: userData?.addresses?.[0]?.city || "",
        state: userData?.addresses?.[0]?.state || "",
        country: userData?.addresses?.[0]?.country || "",
        pincode: userData?.addresses?.[0]?.pincode || "",
      },
    },
  });
  async function onSubmit(values: FormSchema) {
    try {
      await updateProfile(values).unwrap();
      toast("Profile updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update profile.");
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" flex flex-col gap-2 px-64 ">
            <h3 className="text-2xl font-semibold">Your Account</h3>
            <FormInput
              name="name"
              label="Name"
              placeholder="Name"
              form={form}
              className="py-6"
            />
            <FormInput
              name="phone"
              label="Phone"
              placeholder="Enter your phone number"
              form={form}
            />
            <h2 className="font-semibold text-lg mt-12 ">
              Address Information
            </h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="address.fullName"
                label="Full Name"
                placeholder="Full Name for Address"
                form={form}
              />
              <FormInput
                name="address.phone"
                label="Address Phone"
                placeholder="Phone"
                form={form}
              />
              <FormInput
                name="address.street"
                label="Street"
                placeholder="Street"
                form={form}
              />
              <FormInput
                name="address.city"
                label="City"
                placeholder="City"
                form={form}
              />
              <FormInput
                name="address.state"
                label="State"
                placeholder="State"
                form={form}
              />
              <FormInput
                name="address.country"
                label="Country"
                placeholder="Country"
                form={form}
              />
              <FormInput
                name="address.pincode"
                label="Pincode"
                placeholder="Pincode"
                form={form}
              />
            </div>
            <div className="flex gap-4 mt-12">
              <Button
                type="submit"
                disabled={isUpdating}
                className="w-1/2

           "
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                onClick={async () => {
                  if (
                    confirm(
                      "Are you sure you want to delete your account? This action cannot be undone."
                    )
                  ) {
                    try {
                      await deleteProfile().unwrap();
                      await clearCart();
                      toast("Account deleted successfully!");
                      navigate("/");
                    } catch (error) {
                      console.error(error);
                      alert("Failed to delete account.");
                    }
                  }
                }}
                disabled={isDeleting}
                className="w-1/2 "
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AccountForm;
