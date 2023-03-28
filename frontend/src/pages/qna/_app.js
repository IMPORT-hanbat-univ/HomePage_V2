import { QnAContextProvider } from "@/context/qnaContext";

function MyApp({ Component, pageProps }) {
  return (
    <QnAContextProvider>
      <Component {...pageProps} />
    </QnAContextProvider>
  );
}

export default MyApp;
