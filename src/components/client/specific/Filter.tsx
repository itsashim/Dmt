import { Svg } from "../../../assets";
import { AutoComplete, DatePicker, Select, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";

const { RangePicker } = DatePicker;

const items = [
  { label: "Places", value: "places" },
  { label: "Events", value: "events" },
];

const Filter = () => {
  const navigate = useNavigate();
  const { places } = useAppSelector((state: RootAppState) => state.places);
  const [selectCategory, setSelectCategory] = useState<string>(items[0].value);
  const [selectDestination, setSelectDestination] = useState<string>("");
  const { events } = useAppSelector((state: RootAppState) => state.events);
  const [dates, setDates] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  const onExplore = () => {
    if (!dates.start || !dates.end)
      return message.error("Please select a start and an end date.");
    if (!selectDestination)
      return message.error("Please select your destination");

    navigate(
      `/search?start=${dates.start}&end=${dates.end}&type=${selectCategory}&destination=${selectDestination}`
    );
  };

  const isCategoryPlaces = selectCategory === "places";
  const locations = (isCategoryPlaces ? places : events)
    .map((item: any) => ({
      value: isCategoryPlaces ? item.street : item.location,
    }))
    .filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.value === item.value)
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 bg-white rounded-lg w-full max-w-4xl mx-auto border border-primary overflow-hidden text-base md:text-lg">
      {/* Date Picker */}
      <div className="flex items-center gap-1 p-1.5 border-r border-b border-primary min-h-[40px]">
        <img src={Svg.calender} alt="calender icon" className="w-4 h-4 ml-1" />
        <RangePicker
          onChange={(_, dateStrings: string[]) =>
            setDates({ start: dateStrings[0], end: dateStrings[1] })
          }
          className="w-full text-sm min-w-0"
        />
      </div>

      {/* Category Selector */}
      <div className="flex items-center gap-1 p-1.5 border-r border-b border-primary min-h-[40px]">
        <img src={Svg.clock} alt="clock icon" className="w-4 h-4 ml-1" />
        <Select
          defaultValue={selectCategory}
          className="w-full text-sm min-w-0"
          onChange={(value: string) => setSelectCategory(value)}
          options={items}
        />
      </div>

      {/* Destination Input */}
      <div className="flex items-center gap-1 p-1.5 border-r border-b border-primary min-h-[40px]">
        <img src={Svg.marker} alt="marker icon" className="w-4 h-4 ml-1" />
        <AutoComplete
          className="w-full text-sm min-w-0"
          options={locations}
          placeholder="Enter your destination"
          onChange={(value: string) => setSelectDestination(value)}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>

      {/* Explore Button */}
      <button
        type="button"
        onClick={onExplore}
        className="bg-primary text-white font-semibold py-2 text-sm hover:bg-primary/90 transition-colors min-h-[40px]"
      >
        Explore
      </button>
    </div>
  );
};

export default Filter;
