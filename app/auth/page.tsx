"use client";

import { AuthForm } from "@/components/account/AuthForm";
import { PageMeta } from "@/components/PageMeta";

export default function AuthPage() {
  return (
    <>
      <PageMeta
        title="Sign In | Video Speed Reader"
        description="Sign in to your Video Speed Reader account."
        ogDescription="Access your Video Speed Reader workspace."
      />
      <AuthForm />
    </>
  );
}
