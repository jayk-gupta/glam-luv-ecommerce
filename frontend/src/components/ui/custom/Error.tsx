type ErrorProps = {
  error: any;
};

function Error({ error }: ErrorProps) {
  return (
    <div className="text-red-500 mt-2">
      <p className="font-semibold">Error:</p>

      {/* General message */}
      {"data" in error && typeof error.data?.message === "string" && (
        <p>{error.data.message}</p>
      )}

      {/* Email-specific errors */}
      {Array.isArray(error.data?.email) && (
        <ul className="list-disc ml-5">
          {error.data.email.map((msg: string, i: number) => (
            <li key={`email-${i}`}>{msg}</li>
          ))}
        </ul>
      )}

      {/* Password-specific errors */}
      {Array.isArray(error.data?.password) && (
        <ul className="list-disc ml-5">
          {error.data.password.map((msg: string, i: number) => (
            <li key={`password-${i}`}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Error;
