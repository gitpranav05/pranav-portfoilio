import { FC } from "react";
import { Content } from "@prismicio/client";
import Bounded from "@/components/Bounded";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Avatar from "./Avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography: FC<BiographyProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 grid-cols-[2fr,1fr]">
      <Heading as = "h1" size="xl" className="col-start-1">
        {slice.primary.heading}
      </Heading>
      <div className="prose prose-md text-2xl prose-slate prose-invert col-start-1">
        <PrismicRichText field={slice.primary.description} />
      </div>
      <Button linkField={slice.primary.button_link} label={slice.primary.button_text}/>
      <Avatar image={slice.primary.avatar} className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"/>
      </div>
    </Bounded>
  );
};

export default Biography;
