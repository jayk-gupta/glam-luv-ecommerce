import React from "react";
import styles from "../Register/RegisterForm.module.css";
import NoteIcon from "../../UI/icons/NoteIcon";
function FormWrapper({ title, children, handleSubmit }) {
  return (
    <div className="border-2 p-12">
      <NoteIcon className="" />
      <h2 className="mb-12 text-2xl">{title}</h2>
      <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
        {children}
        <button className={styles.button} type="submit">
          {title}
        </button>
      </form>
    </div>
  );
}

export default FormWrapper;
