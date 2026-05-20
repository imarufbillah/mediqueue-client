import { Suspense } from "react";
import { SignUpClient } from "@/components/auth/SignUpClient";

export const metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return (
    <Suspense>
      <SignUpClient />
    </Suspense>
  );
};

export default SignUpPage;
