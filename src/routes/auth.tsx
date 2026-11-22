import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/account/AuthForm";
export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In | Video Speed Reader" },
      { name: "description", content: "Sign in to your Video Speed Reader account." },
      { property: "og:title", content: "Sign In | Video Speed Reader" },
      { property: "og:description", content: "Access your Video Speed Reader workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Auth,
});
function Auth() {
  return <AuthForm />;
}
