"use client";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";

type AvatarProps={
    image:ImageField;
    className?:string;
}

export default function Avatar({
    image, className
}: AvatarProps){
    const component = useRef(null);

    useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      ".avatar",
      { opacity: 0, scale: 1.4 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.inOut" }
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (!component.current) return;
      const rect = (component.current as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;

      const percent = {
        x: (e.clientX - centerX) / rect.width / 2,
      };

      const distFromCenter = 1 - Math.abs(percent.x);

      gsap
        .timeline({ defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" } })
        .to(".avatar", {
          rotation: gsap.utils.clamp(-2, 2, 5 * percent.x),
        }, 0)
        .to(".highlight", {
          opacity: gsap.utils.clamp(0, 1, distFromCenter - 0.7),
          x: -10 + 20 * percent.x,
        }, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, component);

  return () => ctx.revert(); // gsap cleanup
}, []);


    return(
        <div ref={component} className={clsx("relative h-full w-full", className)}>
            <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0" >
<PrismicNextImage
  field={image}
  alt="" // fallback if alt is null
  className="avatar-image h-full w-full object-fill"
  imgixParams={{ q: 90 }}
/>


            <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from transparent via-white to-transparent opacity-0 md:block"></div>
 
        </div>
        </div>
    )
}
