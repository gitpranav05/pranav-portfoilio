"use client"


import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import React, { FC, useRef, useEffect, useLayoutEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { MdCircle } from "react-icons/md";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";

gsap.registerPlugin(ScrollTrigger)
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList: FC<TechListProps> = ({ slice }) => {

  const component = useRef(null )

 useEffect(() => {
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline({
        scrollTrigger: {
          // pin: true, 
          trigger: component.current,
          // markers:true,  
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        },
      );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <section>

    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
      >
      <Bounded as="div">

      <Heading size="lg" className="mb-8" as="h2">
        {slice.primary.heading}
      </Heading>
      </Bounded>


      {slice.primary.tech_name.map(({tech_color, tech_name}, index)=>(
        <div key={index} className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700" aria-label={tech_name || undefined}> 
          {Array.from({length:15}, (_, index)=>(
            <React.Fragment key={index}>
              <span className="  tech-item text-8xl font-bold uppercase tracking-tighter"
              style={{
                color:index===7 && tech_color ? tech_color :"inherit",
              }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle/>
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
<div style={{ height: "30vh" }} />

    </section>
<div style={{ height: "100vh" }} />


              </section>
    
  );
};

export default TechList;
