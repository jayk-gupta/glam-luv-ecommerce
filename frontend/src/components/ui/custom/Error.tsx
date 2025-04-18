

function Error({ error }: any) {
  return (
    <div className="text-red-500">
      <p>Error:</p>
      {"data" in error ? (
        <ul className="list-disc ">
          {/* Display Email Errors */}
          {Array.isArray((error.data as any).email) &&
            (error.data as any).email.map((errMsg: string, index: number) => (
              <li key={`email-${index}`}>{errMsg}</li>
            ))}

          {/* Display Password Errors */}
          {Array.isArray((error.data as any).password) &&
            (error.data as any).password.map(
              (errMsg: string, index: number) => (
                <li key={`password-${index}`}>{errMsg}</li>
              )
            )}
        </ul>
      ) : (
        <p>{(error as any).message || "Something went wrong"}</p>
      )}
    </div>
  );
}

export default Error;
