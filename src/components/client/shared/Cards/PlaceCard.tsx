import { NavLink } from "react-router-dom";
import { Svg } from "../../../../assets";
import { FC } from "react";
import { Place } from "../../../../types/places";
import { ImageAPI } from "../../../../api";

const PlaceCard: FC<{ data: Place }> = ({ data }) => {
  const {
    id,
    title,
    subtitle,
    rating,
    cover_image: { file_key },
  } = data;

  return (
    <NavLink
      to={`/places/details/${id}`}
      className={`w-full bg-white shadow-lg rounded-lg overflow-hidden smooth hover:scale-105`}
    >
      <img
        src={`${ImageAPI}/${file_key}`}
        alt=""
        className={` max-h-[200px] w-full object-cover`}
      />
      <div className={`flex flex-col gap-1 pt-6 p-4`}>
        <h2 className={`text-primary text-xl font-semibold`}>{subtitle}</h2>
        <span className={`text-black text-lg`}>{title}</span>
        <div className={`flex justify-between mt-2.5 w-full`}>
          <div className={`flex items-center`}>
            <img src={Svg.star} alt="star icon" />
            <p className={`mx-2 text-sm font-medium text-dark-gray`}>
              {rating || 1}
            </p>
            <span className={`bg-gray-500 text-dark-gray`}>{`(201)`}</span>
          </div>
          {/* <span className={`text-center text-dark-blue text-lg font-medium`}>
            {`$${price}`}
            <span className={`text-base`}>{`/night`}</span>
          </span> */}
        </div>
      </div>
    </NavLink>
  );
};

export default PlaceCard;
