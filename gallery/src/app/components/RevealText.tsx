import { motion } from "framer-motion";

// import "./globals.css";

interface RevealTextProps {
    text: React.ReactNode;
    boxColor: string;
    trigger?: boolean;
    offset?: number;
}

export default function RevealText({ text, boxColor, trigger, offset = 0 }: RevealTextProps) {
    return (
        <div className="overflow-hidden h-20">
            <motion.div
                variants={{
                    hidden: { opacity: 1, y: 100 },
                    revealed: { opacity: 1, y: 0, transition: { duration: 0.2, delay: offset } },
                }}
                initial="hidden"
                animate={trigger ? "hidden" : "revealed"}
                className="relative inline-block">

                {/* White bar */}
                <motion.div
                    variants={{
                        onScreen: { x: 0, opacity: 1 },
                        offScreen: { x: "100%", transition: { duration: 0.4, delay: 0.2 + offset }, opacity: 1 },
                    }}
                    initial="onScreen"
                    animate={trigger ? "onScreen" : "offScreen"}
                    className={`absolute top-1/2 left-1/2 w-300 h-20 bg-${boxColor} -translate-x-1/2 -translate-y-1/2`}></motion.div>

                {/* Text */}

                {text}
            </motion.div>
        </div>
    )
}