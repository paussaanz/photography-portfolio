import { motion } from "framer-motion";

const AnimatedHeading = ({ yTranslate, yTranslateInverse }) => {
    const splitText = (text) =>
        text.split("").map((char, index) => (
            <>
                <motion.div
                    className="position--relative"
                    style={{
                        y: yTranslate,
                    }}
                >
                    {char}
                </motion.div>
                <motion.div
                    className="position--absolute inset--0"
                    style={{
                        y: yTranslateInverse,
                    }}
                >
                    {char}
                </motion.div>

            </>
        ));

    return (
        <h1 className="animated-heading">
            <div className="word">{splitText("CAPTURE")}</div>
            <div className="word">{splitText("BRILLIANCE")}</div>
        </h1>
    );
};

export default AnimatedHeading;