import Recoil from "@/components/Recoil";
import "./global.scss";
import ReactQuery from "@/components/ReactQuery";
import Footer from "@/components/Footer";
import DesktopHeader from "@/components/DesktopHeader";
import MobileHeader from "@/components/MobileHeader";
import { headers } from "next/headers";
import Header from "@/components/Header";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const headersList = headers();
  // const header_url = headersList.get("x-url") || "";
  // const isEdit = header_url.split("/").includes("edit");
  // console.log("isEdit", isEdit);
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen relative">
          <Recoil>
            <ReactQuery>
              <Header />

              <div className=" z-0 relative ">{children}</div>
              <div id="edit-modal"></div>
            </ReactQuery>
          </Recoil>
        </div>
        <Footer />
      </body>
    </html>
  );
}
