import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import formSchema from "@/schemas/form-schema";
import { Code2Icon, Loader2, SendIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "react-query";
import axiosInstance from "@/service/axios";
import { IUserPostAction } from "@/interface";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useCurrentUser } from "@/context/app-context";

type ActionType = "sign-in" | "sign-up";

const SignInPage = () => {
  const navigate = useNavigate();
  const { setUser } = useCurrentUser();
  const [actionType, setActionType] = useState<ActionType>("sign-in");

  const handleActionType = useCallback(
    (action: ActionType) => setActionType(action),
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const apiPath = useMemo(
    () => (actionType === "sign-in" ? `/api/auth/login` : `/api/auth/create`),
    [actionType]
  );
  const { mutate, isLoading } = useMutation({
    mutationKey: ["create", "login"],
    mutationFn: (data: IUserPostAction) =>
      axiosInstance.post(apiPath, data).then((res) => res.data),
    onSuccess: (data) => {
      setUser(data);
      toast.success("Sign in successfully");
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        // @ts-ignore
        const error_msg: { message: string } = error.response.data;
        toast.error(error_msg.message);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => mutate(values);

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
                  {actionType === "sign-in" ? "Sign In" : "Sign Up"}
                </h1>
                <div className="w-full flex-1">
                  <div className="mx-auto max-w-md">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              type="email"
                              placeholder="Email"
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              type="password"
                              placeholder="Password"
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
                      className="mt-5 w-full py-5"
                    >
                      {isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <SendIcon size={20} />
                      )}
                      <span>Submit</span>
                    </Button>
                    {actionType === "sign-up" ? (
                      <p
                        onClick={() => handleActionType("sign-in")}
                        className="mt-6 text-xs text-gray-600 text-center hover:text-white transition-colors cursor-pointer"
                      >
                        Do you already have an account?
                      </p>
                    ) : (
                      <p
                        onClick={() => handleActionType("sign-up")}
                        className="mt-6 text-xs text-gray-600 text-center hover:text-white transition-colors cursor-pointer"
                      >
                        Don't have an account?
                      </p>
                    )}
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

export default SignInPage;
