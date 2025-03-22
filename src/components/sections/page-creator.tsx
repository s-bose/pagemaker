"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router";
import { compress } from "@/utils";
import PageViewer from "./viewer";

const fontOptions = [
  { value: "font-sans", label: "Sans" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Mono" },
];

const headerSizeOptions = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
  { value: "2xl", label: "2XL" },
  { value: "3xl", label: "3XL" },
  { value: "4xl", label: "4XL" },
  { value: "5xl", label: "5XL" },
];

export default function PageCreator() {
  // const router = useRouter();
  // const { createPage } = usePage();

  const [title, setTitle] = useState("My Landing Page");
  const [backgroundColor, setBackgroundColor] = useState("#f8fafc");
  const [headerSize, setHeaderSize] = useState<
    "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  >("3xl");
  const [fontFamily, setFontFamily] = useState("font-sans");
  const [fontColor, setFontColor] = useState("#1f2937");
  const [content, setContent] = useState("Welcome to my page!");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [createdPageId, setCreatedPageId] = useState<string | null>(null);
  const navigate = useNavigate();

  const createPage = ({
    title,
    backgroundColor,
    headerSize,
    fontFamily,
    content,
    link,
    imageUrl,
  }: {
    title: string;
    backgroundColor: string;
    headerSize: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
    fontFamily: string;
    content: string;
    link?: string;
    imageUrl?: string;
  }) => {
    const encodedPage = compress({
      title,
      backgroundColor,
      headerSize,
      fontFamily,
      content,
      link,
      imageUrl,
    });

    return encodedPage;
  };

  const handleCreatePage = () => {
    const pageId = createPage({
      title,
      backgroundColor,
      headerSize,
      fontFamily,
      content,
      link,
      imageUrl,
    });

    setCreatedPageId(pageId);
  };

  const getShareableLink = () => {
    return `${window.location.origin}/${createdPageId}`;
  };

  const handleViewPage = () => {
    if (createdPageId) {
      navigate(`/${createdPageId}`);
    }
  };
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Your Landing Page</CardTitle>
          <CardDescription>
            Design your personalized landing page. It will be available for 15
            minutes after creation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter page title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your content"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Link (optional)</Label>
                <Input
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </TabsContent>
            <TabsContent value="style" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="background-color">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="background-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
                <Label htmlFor="background-color">Font Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="font-color"
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="header-size">Header Size</Label>
                <Select
                  value={headerSize}
                  onValueChange={(value) => setHeaderSize(value as any)}
                >
                  <SelectTrigger id="header-size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {headerSizeOptions.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Preview</h3>
            <PageViewer
              page={{
                title,
                content,
                link,
                imageUrl,
                backgroundColor,
                fontFamily,
                fontColor,
                headerSize,
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          {!createdPageId ? (
            <Button onClick={handleCreatePage} className="w-full">
              Create Page
            </Button>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Input value={getShareableLink()} readOnly />
                  <Button
                    onClick={() =>
                      navigator.clipboard.writeText(getShareableLink())
                    }
                    variant="outline"
                  >
                    Copy
                  </Button>
                </div>
                <Button onClick={handleViewPage}>View Page</Button>
              </div>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
