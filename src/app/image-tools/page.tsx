import { ImageTools } from "@/components/sections/image-tools"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Tools | CodeBeauty",
  description: "Process, convert, and manipulate images with our powerful image tools. Convert between formats, resize, and more.",
  keywords: "image tools, image converter, jpg to png, png to jpg, image processor",
  openGraph: {
    title: "Image Tools | CodeBeauty",
    description: "Process, convert, and manipulate images with our powerful image tools. Convert between formats, resize, and more.",
    url: "https://codebeauty.com/image-tools",
    type: "website",
    siteName: "CodeBeauty",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Tools | CodeBeauty",
    description: "Process, convert, and manipulate images with our powerful image tools. Convert between formats, resize, and more.",
  },
  alternates: {
    canonical: "https://codebeauty.com/image-tools",
  },
};

export default function ImageToolsPage() {
  return <ImageTools />
}
