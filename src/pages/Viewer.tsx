import { Suspense, useState, useEffect } from "react";

import PageViewer from "@/components/sections/viewer";
import { useParams, useNavigate } from "react-router";
import { Page } from "@/components/sections/viewer";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { decompress } from "@/utils";

export default function ViewPage() {
  const { pageId } = useParams();
  const [page, setPage] = useState<Page>();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Small delay to ensure the page data is loaded from context
    const decodePageUrl = (encodedPageId: string) => {
      const page = decompress(encodedPageId);
      return page as Page;
    };

    const timer = setTimeout(() => {
      const pageData = decodePageUrl(pageId);
      if (pageData) {
        setPage(pageData);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pageId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mx-auto py-10 px-4 flex flex-col items-center justify-center min-h-[70vh]">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Page not found</AlertTitle>
          <AlertDescription>
            This page may have expired or doesn't exist. Pages are automatically
            deleted after 15 minutes.
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate("/")} className="mt-4">
          Create Your Own Page
        </Button>
      </div>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <PageViewer page={page} />
    </Suspense>
  );
}
