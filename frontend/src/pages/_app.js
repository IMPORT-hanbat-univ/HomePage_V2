import Footer from "@/components/Footer";
import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
        <Footer />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
