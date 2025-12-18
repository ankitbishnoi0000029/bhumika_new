import type { Metadata } from "next";
import SnapTubeTray from "./SnapTubeTray";

export const metadata: Metadata = {
  title: "Downloader | CodeBeauty",
  description: "Download videos, music, and files from various platforms with our powerful downloader tool.",
  keywords: "downloader, video downloader, file downloader, online downloader",
  openGraph: {
    title: "Downloader | CodeBeauty",
    description: "Download videos, music, and files from various platforms with our powerful downloader tool.",
    url: "https://codebeauty.com/downloader",
    type: "website",
    siteName: "CodeBeauty",
  },
  twitter: {
    card: "summary_large_image",
    title: "Downloader | CodeBeauty",
    description: "Download videos, music, and files from various platforms with our powerful downloader tool.",
  },
  alternates: {
    canonical: "https://codebeauty.com/downloader",
  },
};

export default function DownloaderPage() {
  return <SnapTubeTray />;
}
