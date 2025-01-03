import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./userDetailsForm.module.css";
interface FormValues {
  firstName: string;
  lastName: string;
  contact: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  image: File | null; // Adding an image field
}

function UserDetailsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("image", file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <h2>Edit profile</h2>
        {/* x logo */}
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.userName}>
          <input
            type="text"
            placeholder="First name"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}

          <input
            type="text"
            placeholder="last name"
            {...register("lastName")}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <input
          type="number"
          placeholder="Contact number"
          {...register("contact", { required: "First Name is required" })}
        />
        {errors.contact && <p>{errors.contact.message}</p>}
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <p>{errors.address.message}</p>}
        <input type="text" placeholder="City" {...register("city")} />
        {errors.city && <p>{errors.city.message}</p>}
        <input type="text" placeholder="State" {...register("state")} />
        {errors.state && <p>{errors.state.message}</p>}
        <input type="number" placeholder="ZIP Code" {...register("zipCode")} />
        {errors.zipCode && <p>{errors.zipCode.message}</p>}
        {/* IMAGE UPLOAD */}
        <div>
          <label>Profile picture</label>
          <input type="file" accept="image/" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: "100px", margin: "10px 0" }}
            />
          )}
        </div>
        {errors.image && <p>{errors.image.message}</p>}
        {/* buttons */}
        <div className={styles.btns}>
          <button className={styles.btn}>Cancel</button>
          <button className={`${styles.btn} bg-black text-white`}>Save</button>
        </div>
      </form>
    </div>
  );
}

export default UserDetailsForm;




