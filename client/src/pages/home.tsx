import Card from "@/components/shared/card";
import CardSkeleton from "@/components/shared/card-skeleton";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import Sheet from "@/components/shared/sheet";
import { IPost } from "@/interface";
import axiosInstance from "@/service/axios";
import { useQuery } from "react-query";

const HomePage = () => {
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-all", "posts"],
    queryFn: () =>
      axiosInstance
        .get<IPost[]>("/api/posts")
        .then((res) => res.data.slice(0, 10)),
  });

  return (
    <section className="min-h-screen">
      <Navbar />
      <Sheet refetch={refetch} />
      <main>
        <div className="py-20 px-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl font-bold leading-tight mb-4">
                Advanced Backend with Frontend
              </h2>

              <p className="text-xl mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eligendi molestiae neque, optio blanditiis unde laudantium earum
                tempora ut rem consequuntur porro eius beatae iusto odio?
                Corrupti doloremque, odio ducimus necessitatibus labore culpa
                minus saepe.
              </p>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713"
                alt="Hero Image"
                className="w-full rounded-xl h-96"
              />
            </div>
          </div>
        </div>
      </main>
      <div>
        <div className="relative px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Posts
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-300 sm:mt-4">
                This is your life and it's ending one minute a time...
              </p>
            </div>
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

export default HomePage;
