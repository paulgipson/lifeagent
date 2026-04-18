import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-heading text-3xl font-bold text-foreground">Blog</h1>
        <p className="mt-4 text-slate-600">
          I&apos;m working on articles and updates—check back soon.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm font-semibold text-brand hover:underline">
          ← Back to home
        </Link>
      </main>
    </>
  );
}
