import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordSchema } from "@/schemas/form-schema";
import axiosInstance from "@/service/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code2Icon, Loader2, SendIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

const RecoveryAccountPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (data: { password: string; confirmPassword: string }) =>
      axiosInstance
        .put("/api/auth/recovery-account", {
          token: token,
          password: data.confirmPassword,
        })
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Your account password has been successfully changed!");
      navigate("/auth");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const onSubmit = (values: z.infer<typeof passwordSchema>) => mutate(values);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-secondary/20 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 w-[80%] p-6 sm:p-12">
          <div>
            <Link to={{ pathname: "/" }} className="flex justify-center ">
              <div className="flex items-center gap-2">
                <Code2Icon size={60} className="stroke-sky-500" />
                <p className="font-bold text-3xl">
                  Code<span className="text-sky-500">.</span>
                </p>
              </div>
            </Link>
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                  Recovery account
                </h1>
                <div className="w-full flex-1">
                  <div className="mx-auto max-w-md">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              type="password"
                              placeholder="Password"
                              className="mt-5 py-5"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              type="password"
                              placeholder="Confirm password"
                              className="mt-5 py-5"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />

                    <Button
                      disabled={isLoading}
                      type="submit"
                      variant="secondary"
                      className="mt-3 w-full py-5"
                    >
                      {isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <SendIcon size={20} />
                      )}
                      <span>Submit</span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryAccountPage;
