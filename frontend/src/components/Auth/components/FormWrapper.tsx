
function FormWrapper({ title, children, handleSubmit }) {
  return (
    <div className=" p-12 flex flex-col items-center">
      <h2 className="mb-12 text-2xl">{title}</h2>
      <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
        {children}
        <button className="" type="submit">
          {title}
        </button>
      </form>
    </div>
  );
}

export default FormWrapper;
