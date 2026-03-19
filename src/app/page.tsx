import { redirect } from "next/navigation";

import { siteData } from "@/lib/site-data";

export default function HomePage() {
  redirect(`/${siteData.defaultLanguage}`);
}