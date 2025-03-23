"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from 'react';
import RevealText from './components/RevealText'
import Image from 'next/image'
import "./globals.css";

function ScrollForMore() {

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: number;

    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        setIsScrolling(false);
      }, 50); // 50ms after scroll stops
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout); // Clear the timeout on unmount
    };
  }, [isScrolling]);

  return (
    <motion.div
      variants={{
        offScreen: { opacity: 0 },
        onScreen: { transition: { duration: 1, delay: 1.5 }, opacity: 0.3 },
      }}
      initial="offScreen"
      animate={isScrolling ? 'offScreen' : 'onScreen'}
      className="flex items-center justify-center fixed bottom-0 left-0 right-0">Scroll for more</motion.div>
  )
}

function Pictures() {

  const scrollThreshold = 2000; // Distance this follows the user

  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [topOfSite, setTopOfSite] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll()

  // Update window size on resize
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize); // Listen to resize event
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up on unmount
    };
  }, []);


  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest === 0) {
      setTopOfSite(!topOfSite);
      setIsVisible(false);
    }
  })

  const yRange = useTransform(scrollY, [scrollThreshold, scrollThreshold + screenHeight], [0, -screenHeight]);

  const text = <span
    className="text-stone-800 font-bold sm:text-sm md:text-lg lg:text-4xl xl:text-7xl 2xl:text-10xl 3xl:text-13xl pt-0"> Captured Moments
  </span>

  return (
    <motion.div
      key={screenWidth}
      className="h-screen sticky top-0 bg-amber-700"
      style={{
        y: yRange,
      }}
    >

      <div className="bg-amber-50 h-full" key={topOfSite ? "reset" : "no-reset"}>

        <motion.div
          variants={{
            outFrame: { opacity: 1, x: "-100%", y: "100%", rotate: 0 },
            inFrame: { opacity: 1, x: "-10%", y: "30%", rotate: 30, transition: { duration: 0.5, type: "spring", stiffness: 70 } },
          }}
          initial="outFrame"
          animate={isVisible ? "inFrame" : "outFrame"}
          viewport={{ once: true }}
          className="flex justify-center h-[50%]"
        >
          <Image src={'/pic1.jpg'} alt="My img" width={300} height={200} className="w-auto" />
        </motion.div>

        <motion.div
          variants={{
            outFrame: { opacity: 1, x: "-100%", y: "100%", rotate: 0 },
            inFrame: { opacity: 1, x: "-20%", y: "-60%", rotate: 20, transition: { duration: 0.5, delay: 0.05, type: "spring", stiffness: 70 } },
          }}
          initial="outFrame"
          animate={isVisible ? "inFrame" : "outFrame"}
          viewport={{ once: true }}
          className="flex justify-center h-[50%]"
        >
          <Image src={'/pic2.jpg'} alt="My img" width={300} height={200} className="w-auto" />
        </motion.div>


        <motion.div
          variants={{
            outFrame: { opacity: 1, x: "-100%", y: "100%", rotate: 0 },
            inFrame: { opacity: 1, x: "-30%", y: "-120%", rotate: 10, transition: { duration: 0.5, delay: 0.2, type: "spring", stiffness: 70 } },
          }}
          initial="outFrame"
          animate={isVisible ? "inFrame" : "outFrame"}
          viewport={{ once: true }}
          className="flex justify-center h-[50%]"
        >
          <Image src={'/pic3.jpg'} alt="My img" width={300} height={200} className="w-auto" />
        </motion.div>

        {/* text */}
        <div className="absolute flex-1 flex justify-end top-[53%] right-[3%]">
          <RevealText text={text} boxColor="black" trigger={!isVisible} offset={0.3}></RevealText>
        </div>

        {/* Invisible div used to trigger animations. */}
        <motion.div
          onViewportEnter={() => setIsVisible(true)}
          className="absolute bottom-[10%]">
        </motion.div>

        {/* Text */}
        {/* {text} */}
        {/* <RevealText text={text} boxColor="white"></RevealText> */}

      </div>
    </motion.div>
  )
}

export default function Home() {

  const HomeText = <span className="text-base sm:text-sm md:text-lg lg:text-4xl xl:text-7xl 2xl:text-10xl 3xl:text-13xl font-bold">
    Where Creativity Meets Vision
  </span>

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     window.scrollTo(0, 0);
  //   }
  // })

  return (


    <div>
      {/* Initial page of what the user sees */}
      <div className="flex flex-col w-full h-[calc(100vh_-_68.4px)]">
        <div className="flex-1 flex items-center justify-center">
          <RevealText text={HomeText} boxColor="white"></RevealText>
        </div>
      </div>


      {/* Images scrolling into view with text */}
      <div className="h-1000">
        <Pictures />
      </div>

      {/* {text} */}
      {/* <div className="h-1000">
      </div> */}


      <ScrollForMore />
    </div>
  )
}