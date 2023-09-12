"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ScrollAnimationContainer.module.css";

type Props = {
  children: React.ReactNode;
};
export default function ScrollAnimationContainer({ children }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <article ref={ref}>
      <motion.span
        className={styles.span}
        style={{
          transform: isInView ? "none" : "translateY(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 1.35s cubic-bezier(0.17, 0.55, 0.55, 1) 0.75s",
        }}
      >
        {children}
      </motion.span>
    </article>
  );
}
