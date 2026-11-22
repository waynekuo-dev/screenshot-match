"use client";

import { AudioLines, Clock3 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { PageMeta } from "@/components/PageMeta";

export function Workspace({ email }: { email: string }) {
  return (
    <>
      <PageMeta
        title="Your Workspace | Video Speed Reader"
        description="Your personal Video Speed Reader workspace."
        ogDescription="Your Video Speed Reader dashboard."
        noindex
      />
      <SiteHeader account />
      <main className="dashboard container-wide fade-in">
        <p className="eyebrow">YOUR WORKSPACE</p>
        <h1>Hi {email}</h1>
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
