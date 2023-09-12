import Recoil from "@/components/ui/Recoil";
import "./global.scss";
import Footer from "@/components/Footer";

import Header from "@/components/Header";
import Notification from "@/components/ui/Notification";

export const metadata = {
  title: "IMPORT",
  description: "Hanbat University IMPORT",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const headersList = headers();
  // const header_url = headersList.get("x-url") || "";
  // const isEdit = header_url.split("/").includes("edit");
  // console.log("isEdit", isEdit);
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen relative overflow-x-hidden">
          <Recoil>
            <Header />
            <Notification />
            <div className=" z-0 relative  overflow-x-hidden">{children}</div>
            <div id="modal"></div>
          </Recoil>
        </div>
        <Footer />
      </body>
    </html>
  );
}
