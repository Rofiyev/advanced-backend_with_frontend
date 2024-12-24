import { IUserPostAction } from "@/interface";
import { emailSchema } from "@/schemas/form-schema";
import axiosInstance from "@/service/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, MailCheckIcon, SendIcon } from "lucide-react";
import { z } from "zod";
import { useState } from "react";

const ForgotPassword = () => {
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: Omit<IUserPostAction, "password">) =>
      axiosInstance
        .post("/api/auth/forgot-password", data)
        .then((res) => res.data),
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const onSubmit = (values: z.infer<typeof emailSchema>) => mutate(values);

  if (success)
    return (
      <div className="flex items-center justify-center w-full h-60">
        <div className="flex flex-col items-center gap-4">
          <MailCheckIcon size={70} className="text-green-500" />
          <h2>A message has been sent to your email address.</h2>
        </div>
      </div>
    );
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mt-12 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">
            Forgot Password
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
                <span>Reset Password</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ForgotPassword;
