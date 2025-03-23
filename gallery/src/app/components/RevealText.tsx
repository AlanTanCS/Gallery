import { motion } from "framer-motion";

// import "./globals.css";

interface RevealTextProps {
    text: React.ReactNode;
    boxColor: string;
}

export default function RevealText({ text, boxColor }: RevealTextProps) {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="overflow-hidden h-20">
                <motion.div
                    variants={{
                        hidden: { opacity: 1, y: 100 },
                        revealed: { opacity: 1, y: 0, transition: { duration: 0.2 } },
                    }}
                    initial="hidden"
                    animate="revealed"
                    className="relative inline-block">

                    {/* White bar */}
                    <motion.div
                        variants={{
                            onScreen: { x: 0, opacity: 1 },
                            offScreen: { x: 1200, transition: { duration: 0.4, delay: 0.2 }, opacity: 1 },
                        }}
                        initial="onScreen"
                        animate="offScreen"
                        //     className="absolute top-1/2 left-1/2 w-300 h-20 bg-black -translate-x-1/2 -translate-y-1/2">
                        // </motion.div>
                        className={`absolute top-1/2 left-1/2 w-300 h-20 bg-${boxColor} -translate-x-1/2 -translate-y-1/2`}></motion.div>

                    {/* Text */}

                    {text}

                    {/* <span className="text-base sm:text-sm md:text-lg lg:text-4xl xl:text-7xl 2xl:text-10xl 3xl:text-13xl font-bold">
                        Where Creativity Meets Vision
                    </span> */}
                </motion.div>

            </div>
        </div>
    )
}