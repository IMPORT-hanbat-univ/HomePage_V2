import React from "react";
import { motion } from "framer-motion";
type Props = {
  children: React.ReactNode;
};

export default function EditModalContainer({ children }: Props) {
  const containerVariants = {
    hidden: {
      y: "100%",
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed  top-0 left-0 w-full h-full z-50 flex flex-col justify-center items-center bg-[#F8F9FA]"
    >
      {children}
    </motion.section>
  );
}
