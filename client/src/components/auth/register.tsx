import { useCurrentUser } from "@/context/app-context";
import { IUserPostAction } from "@/interface";
import formSchema from "@/schemas/form-schema";
import axiosInstance from "@/service/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, SendIcon } from "lucide-react";
import { FC } from "react";
import { ActionType } from "@/pages/auth";
import { z } from "zod";

const Register: FC<{
  actionType: ActionType;
  handleActionType: (action: ActionType) => void;
}> = ({ actionType, handleActionType }) => {
  const navigate = useNavigate();
  const { setUser } = useCurrentUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["create"],
    mutationFn: (data: IUserPostAction) =>
      axiosInstance.post("/api/auth/register", data).then((res) => res.data),
    onSuccess: (data) => {
      setUser(data);
      toast.success("Sign in successfully");
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("A confirmation link has been sent to your email address!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mt-12 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
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
  );
};

export default Register;
