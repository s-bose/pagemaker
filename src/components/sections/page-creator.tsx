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
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { compress } from "@/utils";
import PageViewer, { type Page } from "./viewer";
import EmbedPreview from "./embedder";

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

const embedExamples = [
  {
    name: "YouTube",
    example:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  },
  {
    name: "Twitter/X",
    example:
      '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Hello World!</p>&mdash; Twitter</blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  },
  {
    name: "Spotify",
    example:
      '<iframe src="https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
  },
  {
    name: "Google Maps",
    example:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1034021292393!2d-122.41941578468204!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1625687461947!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
  },
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
  const [embedCode, setEmbedCode] = useState("");
  const [showEmbedExamples, setShowEmbedExamples] = useState(false);

  const navigate = useNavigate();

  const createPage = (page: Page): string => {
    const encodedPage = compress(page);

    return encodedPage;
  };

  const handleCreatePage = () => {
    const pageId = createPage({
      title,
      backgroundColor,
      headerSize,
      fontFamily,
      fontColor,
      content,
      link,
      imageUrl,
      embedCode,
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

  const handleEmbedExampleClick = (example: string) => {
    setEmbedCode(example);
    setShowEmbedExamples(false);
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="embed">Embed</TabsTrigger>
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
            <TabsContent value="embed" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="embed-code">Embed Code</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowEmbedExamples(!showEmbedExamples)}
                  >
                    {showEmbedExamples ? "Hide Examples" : "Show Examples"}
                  </Button>
                </div>
                <Textarea
                  id="embed-code"
                  value={embedCode}
                  onChange={(e) => setEmbedCode(e.target.value)}
                  placeholder="Paste embed code from YouTube, Twitter, Spotify, etc."
                  rows={6}
                />
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Paste embed code from services like YouTube, Twitter,
                    Spotify, or any other platform that provides embed HTML.
                  </AlertDescription>
                </Alert>
              </div>

              {showEmbedExamples && (
                <div className="border rounded-md p-4 space-y-4">
                  <h3 className="font-medium">Example Embed Codes</h3>
                  <div className="space-y-3">
                    {embedExamples.map((example, index) => (
                      <div key={index} className="space-y-1">
                        <h4 className="text-sm font-medium">{example.name}</h4>
                        <div className="flex gap-2">
                          <code className="text-xs bg-muted p-2 rounded flex-1 overflow-x-auto">
                            {example.example}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleEmbedExampleClick(example.example)
                            }
                          >
                            Use
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {embedCode && (
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Embed Preview</h3>
                  <div className="bg-white rounded-md p-2">
                    <EmbedPreview embedCode={embedCode} />
                  </div>
                </div>
              )}
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
                embedCode,
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
