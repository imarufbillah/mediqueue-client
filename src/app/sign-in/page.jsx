import { Suspense } from "react";
import { SignInClient } from "@/components/auth/SignInClient";

export const metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <Suspense>
      <SignInClient />
    </Suspense>
  );
};

export default SignInPage;
