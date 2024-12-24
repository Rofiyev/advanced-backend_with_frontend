import ForgotPassword from "@/components/auth/forgot-password";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { Code2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router";

export type ActionType = "sign-in" | "sign-up" | "forgot-password";

const SignInPage = () => {
  const [actionType, setActionType] = useState<ActionType>("sign-in");

  const handleActionType = useCallback(
    (action: ActionType) => setActionType(action),
    []
  );

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
          {actionType === "sign-up" && (
            <Register
              actionType={actionType}
              handleActionType={handleActionType}
            />
          )}
          {actionType === "sign-in" && (
            <Login
              actionType={actionType}
              handleActionType={handleActionType}
            />
          )}
          {actionType === "forgot-password" && <ForgotPassword />}
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
