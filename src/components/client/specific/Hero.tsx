import { ClientContainer } from "../..";
import Filter from "./Filter";

const Hero = () => {
  return (
    <div
      className="relative w-full py-20 md:py-0 min-h-[65vh] md:min-h-[70vh] flex justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://dmttourism.com/public/front/images/banners/banner_1739958881.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <ClientContainer>
        <div className="relative h-full w-full flex flex-col justify-center text-white">
          <div className="max-w-[32ch] sm:max-w-[40ch] md:max-w-full">
            <h2 className="font-bold md:font-bold text-3xl sm:text-4xl md:text-6xl mb-4 sm:mb-6">
              Explore your <span className="text-purple-500">Dreamtime</span>
            </h2>
            <span className="text-md md:text-l ">
              Tourism Marketplace for Events and Stays
            </span>
          </div>
          <div className="relative flex justify-center items-center md:absolute md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 md:translate-y-1/2 bg-white/90 backdrop-blur-md p-2 sm:p-4 md:p-3 lg:p-4 md:rounded-none rounded-2xl shadow-2xl max-w-5xl lg:max-w-6xl z-10 mt-10 md:mt-0">
            <div className="w-full md:w-[100%] lg:w-[100%] flex justify-center items-center mb-3">
              <Filter />
            </div>
          </div>
        </div>
      </ClientContainer>
    </div>
  );
};

export default Hero;
