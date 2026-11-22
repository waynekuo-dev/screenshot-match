import { AuthForm } from "@/components/account/AuthForm";
import { PageMeta } from "@/components/PageMeta";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Create Account | Video Speed Reader"
        description="Create your Video Speed Reader account with email and password."
        ogDescription="Your next chapter starts with a Video Speed Reader account."
      />
      <AuthForm signup />
    </>
  );
}
