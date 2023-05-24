import Recoil from "@/components/Recoil";
import "./global.scss";
import ReactQuery from "@/components/ReactQuery";
import Footer from "@/components/Footer";
import DesktopHeader from "@/components/DesktopHeader";
import MobileHeader from "@/components/MobileHeader";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://www.dafontfree.net/embed/Y29vcGVyLWhld2l0dC1oZWF2eSZkYXRhLzE2L2MvNzgwMDUvQ29vcGVySGV3aXR0LUhlYXZ5Lm90Zg"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <div className="min-h-screen">
          <Recoil>
            <ReactQuery>
              <div className="hidden  lg:block">
                <DesktopHeader />
              </div>
              <div className="block">
                <MobileHeader />
              </div>
              {children}
            </ReactQuery>
          </Recoil>
        </div>
        <Footer />
      </body>
    </html>
  );
}
