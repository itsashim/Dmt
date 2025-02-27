/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, MouseEvent, useEffect, useState } from "react";
import { Svg } from "../../../assets";
import { FiUsers } from "react-icons/fi";
import {
  IoCalendarOutline,
  IoCloseOutline,
  IoCheckmark,
} from "react-icons/io5";
import type { MenuProps } from "antd";
import { Button } from "../../../components";
import { useNavigate } from "react-router";
import { Dropdown, Modal } from "antd";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { MdKeyboardArrowDown } from "react-icons/md";
import { getBook } from "../../../redux/actions/book";
import StickyBox from "react-sticky-box";

const reservationTabs = [
  {
    label: "Requests Made",
    key: "requests",
  },
  {
    label: "My Listings",
    key: "listings",
  },
];

const category = [
  {
    label: "Stay",
    key: "stay",
  },
  {
    label: "Event",
    key: "event",
  },
];

const events = [
  {
    label: "Online",
    key: "online",
  },
  {
    label: "Onsite",
    key: "onsite",
  },
];

const ReservationStatus: FC<{
  status: "pending" | "completed" | "ongoing";
}> = ({ status }) => (
  <div className={`flex gap-2 items-center`}>
    <img src={Svg.personClock} className={`h-6`} />
    <h4 className={`text-primary capitalize`}>{status}</h4>
  </div>
);

const ReservationCard: FC<{ data?: any }> = ({ data }) => {
  console.log(data);

  const navigate = useNavigate();
  const [modalTitle, setModalTitle] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleModal = () => setOpenModal(!openModal);

  const onNavigate = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    const element = e.target as HTMLLIElement;
    const closest = (id: string) => element.closest(id);

    if (closest(`#accept-reservation`)) {
      setModalTitle(`Are you sure you want to accept the request?`);

      toggleModal();
    } else if (closest(`#decline-reservation`)) {
      setModalTitle(`Are you sure you want to decline the request?`);

      toggleModal();
    } else if (closest(`#reservation-item`))
      navigate(`/app/reservation/123/details`);
  };

  return (
    <li
      id={`reservation-item`}
      onClick={onNavigate}
      className={`reservation-item flex gap-12 items-center justify-center border border-primary rounded-xl p-6 h-fit w-full cursor-pointer`}
    >
      <figure className={`w-fit`}>
        <img
          src={`https://images.unsplash.com/photo-1718040506078-5a7b90746511?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          className={`object-cover object-center bg-center h-44 w-44 rounded-md`}
        />
      </figure>
      <div className={`w-full`}>
        <div className={`flex items-center justify-between`}>
          <div className={`flex gap-3 items-center`}>
            <h2 className={`text-dark-blue text-2xl font-bold`}>
              3B King Superior Room Super clean and neat with mountain views
            </h2>
            <ReservationStatus status={`pending`} />
          </div>
          <h4
            className={`text-dark-gray text-xl capitalize font-bold`}
          >{`$${200}`}</h4>
        </div>
        <div className={`flex items-center gap-4 mt-4`}>
          <h4 className={`text-base text-dark-gray font-bold`}>Ref number</h4>
          <h5 className={`text-dark-gray text-sm`}>001100220033</h5>
        </div>
        <div className={`flex items-start justify-between mt-2`}>
          <div>
            <div className={`flex items-center gap-4`}>
              <FiUsers className={`text-dark-gray`} />
              <h4 className={`text-base text-dark-gray font-bold`}>Guests</h4>
              <h5
                className={`text-dark-gray text-sm`}
              >{`Diwash and 3 others`}</h5>
            </div>
            <div className={`flex items-center gap-4 mt-2`}>
              <IoCalendarOutline className={`text-dark-gray`} />
              <h5 className={`text-dark-gray text-sm`}>{`Nov 01 - Nov 10`}</h5>
            </div>
          </div>
          <div className={`flex flex-col items-end justify-start`}>
            <h5
              className={`text-dark-gray text-sm`}
            >{`Payment upon check-in`}</h5>
            <h5 className={`text-dark-gray text-sm mt-2`}>{`10 nights`}</h5>
          </div>
        </div>
        <div className={`flex items-center justify-end gap-4 mt-8`}>
          <Button
            id={`decline-reservation`}
            title={`Decline`}
            iconPlacement={`center`}
            icon={
              <IoCloseOutline
                className={`text-2xl text-primary group-hover:text-white`}
              />
            }
            className={`w-40`}
          />
          <Button
            id={`accept-reservation`}
            title={`Accept`}
            iconPlacement={`center`}
            icon={
              <IoCheckmark
                className={`text-2xl text-white group-hover:text-primary`}
              />
            }
            className={`w-40`}
            variant="filled"
          />
        </div>
      </div>

      <Modal
        title={modalTitle}
        open={openModal}
        closeIcon={null}
        onCancel={toggleModal}
        onOk={toggleModal}
      ></Modal>
    </li>
  );
};

const ReservationPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    reservations: { online, onsite },
  }: any = useAppSelector((state: RootAppState) => state.events);

  const {
    user: { id: userId },
  } = useAppSelector((state: RootAppState) => state.auth);
  const [selectTab, setSelectTab] = useState<string>(
    reservationTabs[0].key as string
  );
  const [selectCategory, setSelectCategory] = useState<string>(
    category[0].key as string
  );
  const [selectEvent, setSelectEvent] = useState<string>(
    events[0].key as string
  );

  const data: any = selectEvent === "online" ? online : onsite;

  useEffect(() => {
    dispatch(getBook());
  }, []);

  console.log(userId);

  const onSelectTab: MenuProps["onClick"] = ({ key }) => setSelectTab(key);
  const onSelectCategory: MenuProps["onClick"] = ({ key }) =>
    setSelectCategory(key);
  const onSelectEvent: MenuProps["onClick"] = ({ key }) => setSelectEvent(key);

  return (
    <section className={`flex flex-col flex-1 h-full w-full bg-white p-8 `}>
      <StickyBox offsetTop={0} offsetBottom={0} style={{ zIndex: 1 }}>
        <div className={`flex items-center justify-between w-full`}>
          <h1
            className={`text-2xl text-dark-blue font-semibold capitalize`}
          >{`${selectTab}`}</h1>
          <div className="flex items-center justify-center gap-4">
            <Dropdown
              menu={{
                items: reservationTabs,
                selectable: true,
                defaultSelectedKeys: ["0"],
                onClick: onSelectTab,
              }}
              trigger={["click"]}
            >
              <Button
                title={selectTab}
                iconPlacement="right"
                icon={
                  <MdKeyboardArrowDown className={`text-primary text-xl`} />
                }
              />
            </Dropdown>
          </div>
        </div>
      </StickyBox>

      <div className={`flex items-center justify-between w-full mt-4`}>
        <h1 className={`text-2xl text-dark-blue font-semibold capitalize`}>{`${
          data?.length || 0
        } ${selectEvent} ${selectCategory} Reservation`}</h1>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <Dropdown
                menu={{
                  items: events,
                  selectable: true,
                  defaultSelectedKeys: ["0"],
                  onClick: onSelectEvent,
                }}
                trigger={["click"]}
              >
                <Button
                  title={selectEvent}
                  iconPlacement="right"
                  icon={
                    <MdKeyboardArrowDown className={`text-primary text-xl`} />
                  }
                />
              </Dropdown>
            </div>
            <Dropdown
              menu={{
                items: category,
                selectable: true,
                defaultSelectedKeys: ["0"],
                onClick: onSelectCategory,
              }}
              trigger={["click"]}
            >
              <Button
                title={selectCategory}
                iconPlacement="right"
                icon={
                  <MdKeyboardArrowDown className={`text-primary text-xl`} />
                }
              />
            </Dropdown>
          </div>
        </div>
      </div>
      <ul className={`flex flex-col gap-6 w-full mt-4`}>
        {data?.map((item: any, i: number) => (
          <ReservationCard data={item} key={i} />
        ))}
      </ul>
    </section>
  );
};

export default ReservationPage;
