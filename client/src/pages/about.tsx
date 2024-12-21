import Navbar from "@/components/shared/navbar";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <section>
      <Navbar />
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabol sm:text-4xl">About Us</h2>
            <p className="mt-4 text-lg">
              Full-stack developers design and create websites and applications
              for various platforms. A full-stack developer's job description
              might include the following: Develop and maintain web services and
              interfaces. Contribute to front-end and back-end development
              processes. Build new product features or APIs.
            </p>
            <div className="mt-8">
              <Link
                to={{ pathname: "/" }}
                className="text-sky-500 hover:text-sky-600 font-medium"
              >
                Learn more about us
                <span className="ml-2">&#8594;</span>
              </Link>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <img
              src="https://nellore.sivasoft.in/images/course/classroom-front-end-ui-mern-mongodb-express-js-react-js-node-js-training-course-institutes-in-nellore.png"
              alt="About Us Image"
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
