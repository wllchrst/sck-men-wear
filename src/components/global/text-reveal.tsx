import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface I {
  text: string;
}

export default function TextReveal({ text }: I) {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2, // Adjust the duration as needed
        ease: "",
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <Text fontSize={"xx-large"}>{text}</Text>
    </motion.div>
  );
}
