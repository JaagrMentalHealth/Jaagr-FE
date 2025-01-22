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
  user: string;
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
  const {fetchUser}=useUser();
  const Delete=async ()=>{
    try{
      const res=await deleteBlog(slug);
      if(res.status=="success"){
        toast.success('Blog Deleted Successfully');
        fetchUser();
      }
      else{
        toast.error(res);
      }
    }
    catch(err){
      toast.error(err);
    }
    
    
  }
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-500 font-semibold">
                {user.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{user}</p>
                <p className="text-xs text-muted-foreground">{date}</p>
              </div>
            </div>
            <button onClick={Delete} className="px-6 py-2 z-50 bg-orange-50 text-[#262b33] font-semibold rounded-lg shadow-md hover:bg-orange-60 border-orange-500 border-2 transition-all">
            Delete
          </button>
          </div>
          
        </CardContent>
      </Card>
    </Link>
  );
}
