import { FC } from "react";
import { ClientContainer, Section } from "../..";
import { Images, Svg } from "../../../assets";

const Download: FC = () => {
  return (
    <Section>
      <ClientContainer className={`h-[26rem] w-full`}>
        <div
          className={`flex flex-col-reverse md:flex-row rounded-lg shadow lg:shadow-2xl bg-fade-purple overflow-hidden md:overflow-visible`}
        >
          <div className={`relative md:w-2/4 h-full pt-16 pb-10 px-6 md:p-10`}>
            <div
              className={`flex flex-col items-start justify-start gap-6 md:w-[34ch]`}
            >
              <h3 className={`text-2xl text-dark-blue font-medium`}>
                Elevate your experience, Download our app now & manage your
                trips with a tap!
              </h3>
              <p className={`text-sm text-dark-gray`}>
                Save 10% on tours and activities is as easy as booking with the
                DMT App.
              </p>
            </div>
          </div>
          <div className={`relative md:w-2/4`}>
            <img
              alt="sea image"
              src={Images.download_bg}
              className={`h-[26rem] w-full  overflow-hidden`}
            />
            <figure className={`absolute left-20 -bottom-10`}>
              <img
                alt="iphone mockup graphics"
                src={Svg.iphone_mockup_svg}
                className={`h-full w-full`}
              />
            </figure>
          </div>
        </div>
      </ClientContainer>
    </Section>
  );
};

export default Download;
