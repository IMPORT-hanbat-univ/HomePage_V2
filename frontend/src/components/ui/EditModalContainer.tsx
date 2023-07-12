import React from "react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function EditModalContainer({ children, onClose }: Props) {
  return (
    <section
      className="fixed  top-0 left-0 w-full h-full z-50 flex flex-col justify-center items-center bg-neutral-900/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button onClick={onClose} className="fixed top-0 right-0 p-8 text-white">
        x
      </button>
      <div className="bg-white w-4/5 h-4/5 ">{children}</div>
    </section>
  );
}
