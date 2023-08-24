import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

type Props = {
  children: React.ReactNode;
  style?: string;
};

export default function MarqueeContainer({ children, style = "" }: Props) {
  return (
    <Marquee className={`!justify-between ${style}`}>{children}</Marquee>
    // <ul className="shoe_slide clone">
    //   <li>
    //     1-1
    //     <Image src="/images/vscode.png" alt="vscode" width={218} height={218} />
    //   </li>
    //   <li>
    //     1-2
    //     <Image src="/images/flutter.png" alt="flutter" width={218} height={218} />
    //   </li>
    //   <li>
    //     1-3
    //     <Image src="/images/vue.png" alt="vue" width={218} height={218} />
    //   </li>
    //   <li>
    //     1-4
    //     <Image src="/images/nest.png" alt="nest" width={218} height={218} />
    //   </li>
    //   <li>
    //     1-5
    //     <Image src="/images/java.png" alt="java" width={218} height={218} />
    //   </li>
    //   <li>
    //     1-6
    //     <Image src="/images/vscode.png" alt="vscode" width={218} height={218} />
    //   </li>
    // </ul>
    //     </div>
    //   </div>
    // </div>
  );
}
