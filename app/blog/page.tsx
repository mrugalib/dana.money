import type { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex/BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Dana AI",
};

export default function BlogPage() {
  return <BlogIndex />;
}
