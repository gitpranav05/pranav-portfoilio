import React from "react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

const Experience = ({ slice }: ExperienceProps) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>
      {/* {slice.primary.repeatable.map} */}
      {slice.primary.repeatable.map((item, index) => (
        <div key={index} className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
          <Heading as="h3" size="sm">
            {item.title}
          </Heading>
          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
            <span>{item.time_period}</span>
            <span className="text-3xl font-extralight">/</span>
            <span>{item.institution}</span>
          </div>
          <div className="prose prose-lg prose-invert mt-4">
            {item.description}
          </div>

        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
