import Card from "@/components/shared/card";
import CardSkeleton from "@/components/shared/card-skeleton";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import Sheet from "@/components/shared/sheet";
import { IPost } from "@/interface";
import axiosInstance from "@/service/axios";
import { useQuery } from "react-query";

const PostsPage = () => {
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-all", "posts"],
    queryFn: () =>
      axiosInstance.get<IPost[]>("/api/posts").then((res) => res.data),
  });

  return (
    <section className="min-h-screen">
      <Navbar />
      <Sheet refetch={refetch} />
      <div>
        <div className="relative px-6 lg:px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {isLoading ? (
                <>
                  {Array.from({ length: 9 }).map((_, i: number) => (
                    <CardSkeleton key={i} />
                  ))}
                </>
              ) : (
                <>
                  {posts.map((item: IPost) => (
                    <Card key={item.id} item={item} refetch={refetch} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PostsPage;
