

import { useParams, notFound } from "next/navigation"
import { Utility } from "@/components/sections/utility"
import type { Metadata } from "next";
import { MetaData } from "@/utils/types/uiTypes";
import { getMeta } from "@/actions/dbAction";

interface PageProps {
  params: Promise<{ tool: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { params } = await props;
  const { tool } = await params;
  const data = await getMeta("utility", tool);

  if (!data) {
    return {
      title: "Utility Tool Not Found | CodeBeauty",
      description: "The requested utility tool does not exist.",
    };
  }

  let meta: MetaData = {};
  if (typeof data === "string") {
    try {
      meta = JSON.parse(data || "{}");
    } catch (e) {
      // If parsing fails, meta remains empty
    }
  } else if (typeof data === "object" && data !== null) {
    meta = { ...data } as MetaData;
  }
  const title = meta.title || "Utility Tool";
  const description = meta.description || "Use our powerful utility tools for various development tasks.";
  const keywords = meta.keywords || "utility tools, developer tools, web utilities";

  return {
    title: `${title} | CodeBeauty`,
    description,
    keywords,
    openGraph: {
      title: `${title} | CodeBeauty`,
      description,
      url: `https://codebeauty.com/utility/${tool}`,
      type: "website",
      siteName: "CodeBeauty",
      ...(meta.ogImage && { images: [{ url: meta.ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CodeBeauty`,
      description,
    },
    alternates: {
      canonical: `https://codebeauty.com/utility/${tool}`,
    },
  };
}

const validTools = [
  "send-snap-message",
  "responsive-website-tester",
  "credit-card-validator",
  "credit-card-fake-number-generator",
  "xpath-tester",
  "json-path-tester",
  "json-minifier",
  "file-difference",
  "json-diff",
  "xml-diff",
  "broken-link-checker",
  "json-deserialize-online",
  "json-serialize-online",
  "json-stringify-online",
  "xml-stringify-online",
  "string-to-json-online",
  "javascript-obfuscator",
  "curl-to-php",
  "crontab-format",
]

export default function ToolPage() {
  const params = useParams()
  const tool = params?.tool as string

  if (!validTools.includes(tool)) {
    notFound()
  }

  return <Utility defaultTool={tool} />
}
