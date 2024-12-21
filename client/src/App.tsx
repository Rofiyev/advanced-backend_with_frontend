import { Route, Routes } from "react-router";
import {
  HomePage,
  NotFoundPage,
  SignInPage,
  PostDetailPage,
  ContactPage,
  AboutPage,
  PostsPage,
} from "./pages";
import { ThemeProvider } from "./components/shared/theme-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { CurrentUserProvider } from "./context/app-context";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentUserProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="auth">
              <Route path="sign-in" element={<SignInPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </CurrentUserProvider>
    </QueryClientProvider>
  );
}

export default App;
