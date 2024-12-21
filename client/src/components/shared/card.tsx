import { FC, MouseEvent, useCallback } from "react";
import { IPost } from "@/interface";
import { useNavigate } from "react-router";
import { useCurrentUser } from "@/context/app-context";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { readingTime } from "@/service/reading-time";
import { useMutation } from "react-query";
import axiosInstance from "@/service/axios";
import { toast } from "react-toastify";
import moment from "moment";

const Card: FC<{ item: IPost; refetch: () => void }> = ({ item, refetch }) => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete post"],
    mutationFn: (id: string) => axiosInstance.delete(`/api/posts/delete/${id}`),
    onSuccess: () => {
      toast.success("Deleted post successfully");
      refetch();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const deletePost = useCallback(
    (e: MouseEvent<HTMLButtonElement>, id: string) => {
      e.stopPropagation();
      deleteMutate(id);
    },
    [deleteMutate]
  );

  return (
    <div
      onClick={() => navigate(`/posts/${item.id}`)}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg"
    >
      <div className="flex-shrink-0 relative h-60 group">
        <img
          className="h-full w-full object-cover absolute left-0 top-0"
          src={`${import.meta.env.VITE_API_URL}/${item.picture}`}
          alt="Post"
        />
        {item.author.id === user?.id && (
          <div className="absolute top-1 right-1 hidden flex-col gap-1 group-hover:flex">
            <Button
              variant="destructive"
              size="icon"
              onClick={(e: MouseEvent<HTMLButtonElement>) =>
                deletePost(e, item.id)
              }
            >
              <Trash2Icon size={20} />
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between bg-secondary/20 p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-sky-500">
            <span className="hover:underline">Article</span>
          </p>
          <div className="mt-2 block">
            <p className="text-xl font-semibold">{item.title}</p>
            <p className="mt-3 text-base text-muted-foreground line-clamp-3">
              {item.description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div>
              <span className="sr-only">Email: {item.author.email}</span>
              <img
                className="h-10 w-10 rounded-full"
                src="/placeholder.jpg"
                alt="User"
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              <span className="hover:underline">{item.author.email}</span>
            </p>
            <div className="flex space-x-1 text-sm text-muted-foreground">
              <time>{moment(item.createdAt).format("LL")}</time>
              <span aria-hidden="true">·</span>
              <span>{readingTime(item.description)} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
