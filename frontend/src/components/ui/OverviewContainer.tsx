import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  tagText: string;
  content: string;
  badgeText: string;
  imageOrder: "right" | "left";
};

export default function OverviewContainer({
  children,
  title,
  tagText,
  content,
  badgeText,
  imageOrder = "left",
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center">
      {imageOrder === "left" ? (
        <>
          {children}
          <div>
            <span className="bg-[#23412A] text-white md:px-4 md:py-1 px-3 py-1 rounded-[20px] text-sm md:text-[20px] font-semibold leading-[50px] tracking-[-0.3px]">
              {badgeText}
            </span>
            <h3
              dangerouslySetInnerHTML={{ __html: title }}
              className="text-3xl md:text-[50px] font-extrabold leading-7 md:leading-[60px] tracking-[-0.75px]"
            ></h3>
            <p className="opacity-70 text-lg md:text-[20px] md:leading-[40px] tracking-[-0.3px]">{tagText}</p>
            <p
              dangerouslySetInnerHTML={{ __html: content }}
              className="mt-6 opacity-80 text-2xl md:text-[30px] font-bold leading-10 md:leading-[60px] tracking-[-0.45px]"
            ></p>
          </div>
        </>
      ) : (
        <>
          <div>
            <span className="bg-[#23412A] text-white md:px-4 md:py-1 px-3 py-1 rounded-[20px] text-sm md:text-[20px] font-semibold leading-[50px] tracking-[-0.3px]">
              {badgeText}
            </span>
            <h3
              dangerouslySetInnerHTML={{ __html: title }}
              className="text-3xl md:text-[50px] font-extrabold leading-7 md:leading-[60px] tracking-[-0.75px]"
            ></h3>
            <p className="opacity-70 text-lg md:text-[20px] md:leading-[40px] tracking-[-0.3px]">{tagText}</p>
            <p
              dangerouslySetInnerHTML={{ __html: content }}
              className="mt-6 opacity-80 text-2xl md:text-[30px] font-bold leading-10 md:leading-[60px] tracking-[-0.45px]"
            ></p>
          </div>
          {children}
        </>
      )}
    </div>
  );
}
