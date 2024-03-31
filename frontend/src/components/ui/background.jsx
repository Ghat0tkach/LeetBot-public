import { motion } from "framer-motion";
import React, { useState } from "react";
import { AuroraBackground } from "./aurora-background";

export default function Background({ children }) {
  return (
    <div className="fixed top-0 right-0 z-50 h-screen w-96 bg-white shadow-lg">
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          //   className="relative flex flex-col gap-4 items-center justify-center px-4"
          style={{
            height: "calc(100% - 3.5rem)",
            width: "calc(100%)",
          }} // Adjust the height here
        >
          {children}
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
