import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import CustomSection from "@/views/home/components/customSection";

// import gradient from '@/assets/home/desc-gradient.png'


// const paragraph = 'Athena X is a cryptocurrency research and data analytics platform with a mission to bring transparency to the cryptoeconomy. It targets investors, regulators, founders, builders, business developers, and professional services in the crypto space, offering tools to navigate the complex cryptocurrency landscape.'
const paragraph = 'Athena X is a cryptocurrency data and research analytics platform built to bring transparency to the cryptoeconomy. We empower investors, regulators, founders, builders, business developers, and service professionals with powerful tools to navigate the complex world of crypto. Our mission is to simplify insights, support smarter decisions, and shape a more transparent digital asset landscape.'



interface DescriptionProps { }


interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

export const Description: React.FC<DescriptionProps> = ({ }) => {

  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    // offset: ["start 0.8", "start 0.25"],
    offset: ["start 0.6", "start 0.1"],
  });

  const words = paragraph.split(' ');

  return (
    <div className="relative">
      <CustomSection>
        <div className="flex justify-center">

          <p
            ref={container}
            // className="text-2xl sm:text-3xl md:text-5xl font-bold lg:w-2/3 leading-[42px] md:leading-[150%]"
            className="flex text-[32px] md:text-[48px] font-[900] leading-[40px] md:leading-[115%] -tracking-[1px] md:-tracking-[2.69px] lg:w-2/3 flex-wrap"
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </CustomSection>
      <picture>
        <source srcSet="https://link.storjshare.io/raw/jubytcdptnushzbz3frhn5ez7vda/athenax/description-gradient.webp" type="image/webp" />
        <source srcSet="https://link.storjshare.io/raw/jvj2rauokxbycdjhh4iv5zvc4wja/athenax/description-gradient.png" type="image/png" />
        <img src="https://link.storjshare.io/raw/jvj2rauokxbycdjhh4iv5zvc4wja/athenax/description-gradient.png" srcSet="https://link.storjshare.io/raw/jvj2rauokxbycdjhh4iv5zvc4wja/athenax/description-gradient.png" alt="Desc gradient" className="-z-10 absolute right-0 bottom-0 translate-y-1/3 w-4xl" />
      </picture>
    </div>
  )
}

const Word = ({ children, progress, range }: WordProps) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="relative mr-[12px] mt-[12px]">
      {children.split('').map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({ children, progress, range }: CharProps) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span>
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};