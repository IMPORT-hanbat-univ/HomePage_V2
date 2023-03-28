import { NoticeContextProvider } from "@/context/noticeContext";

function MyApp({ Component, pageProps }) {
  return (
    <NoticeContextProvider>
      <Component {...pageProps} />
    </NoticeContextProvider>
  );
}

export default MyApp;
