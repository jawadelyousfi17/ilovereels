import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("/instagram-audio-downloader");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return <ToolPage tool={tool} />;
}
