import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { Link, useParams } from "react-router";
import { useMutation } from "react-query";
import axiosInstance from "@/service/axios";

const SuccessPage = () => {
  const { userId } = useParams();

  useMutation({
    mutationKey: ["activated"],
    mutationFn: () => axiosInstance.post(`/api/auth/activation/${userId}`),
  });

  const { width, height } = useWindowSize();

  return (
    <section>
      <Confetti width={width} height={height} />
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="font-semibold text-3xl">
            Your email address has been activated!
          </h3>
          <Link to={{ pathname: "/" }}>
            <Button variant="secondary" className="flex items-center">
              <HomeIcon size={20} /> Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
