import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet as SheetUI,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useSheet from "@/hooks/use-sheet";
import { Textarea } from "../ui/textarea";
import { SendIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import postSchema from "@/schemas/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ChangeEvent, FC } from "react";
import { useMutation } from "react-query";
import axiosInstance from "@/service/axios";
import { toast } from "react-toastify";

const Sheet: FC<{ refetch: () => void }> = ({ refetch }) => {
  const { open, setOpen } = useSheet();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      picture: undefined,
    },
  });

  const { mutate: createPost } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: (formData: FormData) =>
      axiosInstance
        .post("/api/posts/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Created post successfully");
      setOpen();
      refetch();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const onSubmit = ({
    title,
    description,
    picture,
  }: z.infer<typeof postSchema>) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("picture", picture as File);
    createPost(formData);
  };

  return (
    <SheetUI open={open} onOpenChange={setOpen}>
      <SheetContent className="w-[350px] sm:w-[540px]">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Create Post</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-full"
                        placeholder="Description"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="file"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files?.[0]) {
                            const file = e.target.files[0];
                            field.onChange(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className="mt-4">
              <Button
                type="submit"
                variant="secondary"
                className="flex items-center gap-2 w-full"
              >
                <SendIcon size={20} /> Submit
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </SheetUI>
  );
};
export default Sheet;
