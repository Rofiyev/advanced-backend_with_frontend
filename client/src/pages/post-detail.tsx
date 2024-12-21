import Navbar from "@/components/shared/navbar";
import { IPost } from "@/interface";
import axiosInstance from "@/service/axios";
import { ClockIcon, User2Icon } from "lucide-react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostDetailPage = () => {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["get-one"],
    queryFn: () =>
      axiosInstance.get<IPost>(`/api/posts/${id}`).then((res) => res.data),
  });

  return (
    <>
      <Navbar />
      {!isLoading && post && (
        <div className="max-w-screen-lg mx-auto p-5 sm:p-10 md:p-16">
          <div className="mb-10 rounded overflow-hidden flex flex-col mx-auto">
            <h1 className="text-xl sm:text-4xl font-semibold hover:text-sky-500 transition duration-500 ease-in-out inline-block mb-2">
              {post.title}
            </h1>

            <div className="relative">
              <img
                className="w-full h-96 object-cover"
                src={`${import.meta.env.VITE_API_URL}/${post.picture}`}
                alt="Sunset in the mountains"
              />
            </div>
            <p className="text-muted-foreground py-5 text-base leading-8">
              {post.description}
            </p>
            <div className="py-5 text-sm font-regular flex">
              <span className="mr-3 flex flex-row items-center">
                <ClockIcon size={20} />
                <span className="ml-1 text-muted-foreground">
                  <ReactTimeAgo date={post.createdAt} locale="en-US" />
                </span>
              </span>
              <div className="flex flex-row items-center text-muted-foreground">
                <User2Icon size={20} />
                <span className="ml-1">{post.author.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailPage;
