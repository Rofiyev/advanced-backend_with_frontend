import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/context/app-context";
import { LogOutIcon, PlusIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import axiosInstance from "@/service/axios";
import useSheet from "@/hooks/use-sheet";

const UserButton = () => {
  const { user, setUser } = useCurrentUser();
  const { setOpen } = useSheet();

  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () =>
      axiosInstance.post("/api/auth/logout").then((res) => res.data),
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem("accessToken");
      toast.success("Logout user successfully!");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8">
          <AvatarImage src="/placeholder.jpg" />
          <AvatarFallback>
            {user?.email.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="text-sm text-muted-foreground font-normal">
            {user?.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={setOpen}
          className="cursor-pointer flex items-center"
        >
          <PlusIcon size={20} /> Create Post
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => logout()}
          className="flex items-center bg-red-500 hover:bg-red-600 cursor-pointer mt-1"
        >
          <LogOutIcon size={20} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
