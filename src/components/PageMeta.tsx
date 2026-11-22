"use client";

import { useEffect } from "react";

type MetaEntry = { property?: string; name?: string; content: string };

function upsertMeta({ property, name, content }: MetaEntry) {
  const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if (property) tag.setAttribute("property", property);
    if (name) tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Per-page <title> and meta tags, replacing TanStack's route head(). Runs on the
 * client after navigation — adequate for this SPA's SEO/sharing needs.
 */
export function PageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  noindex,
}: {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    document.title = title;
    if (description) upsertMeta({ name: "description", content: description });
    upsertMeta({ property: "og:title", content: ogTitle ?? title });
    if (ogDescription ?? description)
      upsertMeta({ property: "og:description", content: (ogDescription ?? description)! });
    if (noindex) {
      upsertMeta({ name: "robots", content: "noindex" });
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }
  }, [title, description, ogTitle, ogDescription, noindex]);

  return null;
}
