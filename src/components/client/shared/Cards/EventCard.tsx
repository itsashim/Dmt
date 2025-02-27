/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { FC } from "react";
import { EventModel } from "../../../../types/event";
import { ImageAPI } from "../../../../api";

const EventCard: FC<{ data: EventModel }> = ({ data }) => {
  const { id, name, location, eventType, price, category, language, files } =
    data as any;

  return (
    <NavLink
      to={`/events/details/${id}`}
      className={`w-full bg-white shadow-lg rounded-lg overflow-hidden smooth hover:scale-105`}
    >
      <img
        src={`${ImageAPI}/${files[0].file_key}`}
        alt=""
        className={` max-h-[200px] w-full object-cover`}
      />
      <div className={`flex flex-col gap-2 pt-6 p-4`}>
        <div className={`flex items-center justify-between`}>
          <h2 className={`text-black text-lg capitalize`}>{name}</h2>
          <span
            className={`text-white text-xs font-semibold capitalize py-2 px-3 rounded bg-primary w-fit`}
          >
            {eventType}
          </span>
        </div>
        <span className={`text-dark-gray mt-2 text-md h-10`}>{location}</span>
        <div className={`flex justify-between mt-2.5 w-full`}>
          <p className={`text-sm font-medium text-dark-gray`}>
            {`Category: ${category}`}
          </p>
          <span className={`text-center text-dark-blue text-lg font-medium`}>
            {`$${price}`}
          </span>
        </div>
        <div className={`flex justify-between w-full`}>
          <p
            className={`text-sm font-medium text-dark-gray capitalize`}
          >{`Language: ${language}`}</p>
          <span className={`text-center text-dark-blue text-lg font-medium`}>
            {`$${price}`}
            <span className={`text-base`}>{`/night`}</span>
          </span>
        </div>
      </div>
    </NavLink>
  );
};

export default EventCard;
