import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/account/AuthForm";
export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Create Account | Video Speed Reader" },
      {
        name: "description",
        content: "Create your Video Speed Reader account with email and password.",
      },
      { property: "og:title", content: "Create Account | Video Speed Reader" },
      {
        property: "og:description",
        content: "Your next chapter starts with a Video Speed Reader account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Signup,
});
function Signup() {
  return <AuthForm signup />;
}
