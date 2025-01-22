import { useEffect, useState } from "react";
import { deleteBlog } from "@/api/blogAPI";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUser } from "@/contexts/userContext";

interface BlogCardProps {
  heading: string;
  excerpt: string;
  author: string;
  date: string;
  coverPhoto: string;
  slug: string;
  user?: string;
}

export function BlogCard({
  heading,
  excerpt,
  author,
  date,
  coverPhoto,
  slug,
  user,
}: BlogCardProps) {
  const writer = user || author;
  const deleteStatus = user ? true : false;
  const { fetchUser } = useUser();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteBlog(slug);
      console.log(res.status);
      if (res.status == 204) {
        toast.success("Blog Deleted Successfully");
        fetchUser();
      } else {
        toast.error(res);
        // fetchUser();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div
        className={`transform transition-transform z-20 relative  duration-300 ${
          isHovered && deleteStatus ? "-translate-y-12" : ""
        }`}
      >
        <Link href={`/blog/${slug}`}>
          <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="aspect-[16/9] relative overflow-hidden">
              <Image
                src={coverPhoto ? `${coverPhoto}` : `/window.svg`}
                alt={heading}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <h3 className="line-clamp-2 text-xl font-semibold">{heading}</h3>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <p className="line-clamp-3 text-sm text-muted-foreground mb-4">
                {excerpt}
              </p>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-500 font-semibold">
                  {writer.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{writer}</p>
                  <p className="text-xs text-muted-foreground">{date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      {/* {isHovered && ( */}
      {deleteStatus ? (
        <div className="absolute inset-x-0 z-0  -bottom-2 p-2">
          <button
            onClick={handleDelete}
            className="w-full px-6 py-2 z-0 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all"
          >
            Delete Blog
          </button>
        </div>
      ) : (
        <></>
      )}
      {/* )} */}
    </div>
  );
}
