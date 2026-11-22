import { createFileRoute } from "@tanstack/react-router";
import { AudioLines, Clock3 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Your Workspace | Video Speed Reader" },
      { name: "description", content: "Your personal Video Speed Reader workspace." },
      { property: "og:title", content: "Your Workspace | Video Speed Reader" },
      { property: "og:description", content: "Your Video Speed Reader dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: App,
});
function App() {
  const { user } = Route.useRouteContext();
  return (
    <>
      <SiteHeader account />
      <main className="dashboard container-wide fade-in">
        <p className="eyebrow">YOUR WORKSPACE</p>
        <h1>Hi {user.email}</h1>
        <div className="dashboard-empty">
          <span className="feature-icon">
            <AudioLines size={30} />
          </span>
          <div className="inline-flex items-center gap-2 text-xs text-primary">
            <Clock3 size={13} />
            COMING SOON
          </div>
          <h2>Your dashboard is coming soon.</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Upload functionality will be added in the next milestone.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
