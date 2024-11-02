import { motion } from "framer-motion";

export const transition = (OgComponent) => {
  const TransitionComponent = () => {
    return (
      <>
        <OgComponent />
        <motion.div
          className="slide-in"
          intial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        ></motion.div>
        <motion.div
          className="slide-out"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        ></motion.div>
      </>
    );
  };

  TransitionComponent.displayName = "TransitionComponent";
  return TransitionComponent;
};
