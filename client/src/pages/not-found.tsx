import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <section className="flex items-center h-screen p-16">
      <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl dark:text-gray-300">
            Sorry, we couldn't find this page.
          </p>
          <Link to={{ pathname: "/" }}>
            <Button className="bg-sky-500 hover:bg-sky-600 transition-colors font-medium text-white">
              <ArrowLeft size={20} className="text-white" /> Back to home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
