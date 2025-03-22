import { Suspense } from "react";
import PageCreator from "@/components/sections/page-creator";
export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <PageCreator />
      </Suspense>
    </main>
  );
}
