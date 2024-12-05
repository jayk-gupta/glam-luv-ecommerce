import React from 'react'
import SignUpForm from './SignUpForm';

function SignUp() {
  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 items-center justify-center">
        <SignUpForm/>
      </div>
    </div>
  );
}

export default SignUp