import { createContext, useState, ReactNode, useContext, FC } from "react";
import { IUser } from "@/interface";
import { useQuery } from "react-query";
import axiosInstance from "@/service/axios";

interface CurrentUserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export const CurrentUserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  useQuery({
    queryKey: ["current-user"],
    queryFn: () =>
      axiosInstance.get<IUser>("/api/auth/refresh").then((res) => res.data),
    enabled: !!localStorage.getItem("accessToken"),
    onSuccess: (data: IUser) => {
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data);
    },
  });

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser must be used within a <CurrentUserProvider>"
    );
  }

  return currentUserContext;
};
