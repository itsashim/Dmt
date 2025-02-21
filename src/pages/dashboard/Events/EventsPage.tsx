/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { TableColumnsType, Table, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { EventModel } from "../../../types/event";
import { useAppSelector } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import DeleteEvent from "./Delete/DeleteEvent";

const items = [
  {
    label: "Online",
    key: "online",
  },
  {
    label: "Onsite",
    key: "onsite",
  },
];

const columns: TableColumnsType<EventModel> = [
  {
    title: "Image",
    dataIndex: "files",
    render: (data) => <img src={data[0].url} alt={data[0].original_name} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string, record: EventModel) => (
      <NavLink to={`/app/events/${record.id}/details`}>{text}</NavLink>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Business Nature",
    dataIndex: "businessNature",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, { id }: EventModel) => {
      if (id) {
        return <DeleteEvent id={id} />;
      }
    },
  },
];

const EventsPage = () => {
  const navigate = useNavigate();
  const { events } = useAppSelector((state: RootAppState) => state.events);
  const {
    user: { id: userId },
  } = useAppSelector((state: RootAppState) => state.auth);
  const [selectEvent, setSelectEvent] = useState<string>(
    items[0].key as string
  );

  const onSelectEvent: MenuProps["onClick"] = ({ key }) => setSelectEvent(key);

  // const handleMenuClick: MenuProps["onClick"] = (e) => {
  //   message.info("Click on menu item.");
  //   console.log("click", e);
  // };

  const data: any = events
    ?.filter(
      ({ eventType, sellerId }: any) =>
        eventType === selectEvent.toUpperCase() && sellerId === userId
    )
    ?.map((item, i: number) => ({
      key: i.toString(),
      ...item,
    }));

  return (
    <div className="w-full h-full">
      <div className={`flex items-center justify-between w-full`}>
        <h1 className={`text-2xl text-dark-blue font-semibold`}>{`${
          data?.length || 0
        } Events`}</h1>
        <div className="flex items-center justify-center gap-4">
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["0"],
              onClick: onSelectEvent,
            }}
            trigger={["click"]}
          >
            <Button
              title={selectEvent}
              iconPlacement="right"
              icon={<MdKeyboardArrowDown className={`text-primary text-xl`} />}
            />
          </Dropdown>
          <Button
            title="Add Event"
            variant="filled"
            onClick={() => navigate("/app/events/create")}
          />
        </div>
      </div>
      <div className={`mt-6`}>
        <Table
          columns={columns}
          dataSource={data}
          style={{
            backgroundColor: `transparent`,
          }}
          className={`bg-none`}
        />
      </div>
      {/* <div className="mt-8 flow-root  ">
        <div className="w-full py-2 align-middle sm:mx-6 lg:mx-8">
          <div className="relative">
            {selected.length > 0 && (
              <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                <button
                  type="button"
                  className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  Delete all
                </button>
              </div>
            )}
            <table className="w-full table-fixed divide-y divide-gray-300 ">
              <tbody className="divide-y divide-gray-200 bg-white !font-normal">
                {curEvent.map((event: any) => (
                  <tr
                    key={event.id}
                    className={
                      selected.includes(event) ? "bg-gray-50" : undefined
                    }
                  >
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      {selected.includes(event) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value={event.id}
                        checked={selected.includes(event)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSelected(
                            e.target.checked
                              ? [...selected, event]
                              : selected.filter((p) => p !== event)
                          )
                        }
                      />
                    </td>
                    <td
                      className={classNames(
                        "whitespace-nowrap py-4 pr-3 text-sm ",
                        selected.includes(event)
                          ? "text-indigo-600"
                          : "text-gray-900"
                      )}
                    >
                      {event.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {event.price}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {event.eventType}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {event.noOfPromotionDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default EventsPage;
