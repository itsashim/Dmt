import { Dropdown, MenuProps } from "antd";
import { ChangeEvent, FC, useEffect, useState } from "react";
// import {
//   business_offer,
//   business_offer_experience_type,
// } from "../../../../lib/constants/stays";
import DashboardInput from "../DashboardInput";
// import RadioBox from "../RadioBox";
import {
  businessEvent,
  businessOffer,
} from "../../../../lib/constants/dashboard";
import { MdKeyboardArrowDown } from "react-icons/md";
import { business_items } from "../../../../lib/constants/events";
import { Button } from "../../..";

type BusinessNatureType = "INDIVIDUAL" | "BUSINESS";
type BusinessOfferType = "accomodation" | "experience";
type BusinessEventType = "ONLINE" | "ONSITE";

interface FormModal {
  businessNature: BusinessNatureType;
  individualNbr: string;
  individualTaxIdNbr: string;
  businessRegistrationNbr: string;
  businessTaxIdNbr: string;
  businessOffer: 1 | 2;
  businessEvent: 1 | 2;
}

const formInitState: FormModal = {
  businessNature: "INDIVIDUAL",
  individualNbr: "",
  individualTaxIdNbr: "",
  businessRegistrationNbr: "",
  businessTaxIdNbr: "",
  businessOffer: 1,
  businessEvent: 1,
};

type PlacesType = {
  businessNature: BusinessNatureType;
  individualNbr: string;
  individualTaxIdNbr: string;
  businessRegistrationNbr: string;
  businessTaxIdNbr: string;
};

type EventsType = {
  businessNature: BusinessNatureType;
  businessOffer: BusinessOfferType;
  individualNbr: string;
  individualTaxIdNbr: string;
  businessRegistrationNbr: string;
  businessTaxIdNbr: string;
  eventType: BusinessEventType;
};

interface Props {
  formType?: "places" | "events";
  businessData: PlacesType | EventsType;
  getBusinessData?: (data: PlacesType | EventsType) => void;
}

const BusinessForm: FC<Props> = ({
  businessData,
  getBusinessData,
  formType = "places",
}) => {
  const [formState, setFormState] = useState<FormModal>(formInitState);
  const [businessItem, setBusinessItem] = useState<string>(
    businessData.businessNature
  );

  useEffect(() => {
    setFormState({
      businessNature: businessData.businessNature,
      individualNbr: businessData.individualNbr,
      individualTaxIdNbr: businessData.individualTaxIdNbr,
      businessRegistrationNbr: businessData.businessRegistrationNbr,
      businessTaxIdNbr: businessData.businessTaxIdNbr,
      businessOffer: 1,
      businessEvent: 1,
    });
  }, []);

  useEffect(() => {
    if (getBusinessData) {
      let data: Partial<PlacesType & EventsType> = {
        businessNature: formState.businessNature,
        individualNbr: formState.individualNbr,
        individualTaxIdNbr: formState.individualTaxIdNbr,
        businessRegistrationNbr: formState.businessRegistrationNbr,
        businessTaxIdNbr: formState.businessTaxIdNbr,
      };

      if (formType === "events") {
        data = {
          ...data,
          businessOffer: businessOffer[formState.businessOffer],
          eventType: businessEvent[formState.businessEvent],
        } as EventsType;
      }

      getBusinessData(
        formType === "places" ? (data as PlacesType) : (data as EventsType)
      );
    }
  }, [formState]);

  // const onRadioChange = (e: RadioChangeEvent, type: string) =>
  //   setFormState((prevState) => {
  //     return {
  //       ...prevState,
  //       [type]: e.target.value,
  //     };
  //   });

  const onChangehandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const onBussinessItemClick: MenuProps["onClick"] = ({ key }) => {
    setBusinessItem(key);
    setFormState({
      ...formState,
      businessNature: key as BusinessNatureType,
    });
  };

  return (
    <div className={`w-full`}>
      <div className={`mt-8 border-2 border-fade-white p-4 rounded-lg`}>
        <div className={`border-2 border-fade-white p-4 rounded-lg`}>
          <h3 className={`text-dark-blue mb-2 font-semibold`}>
            Select Business Nature
          </h3>
          <Dropdown
            menu={{
              selectable: true,
              items: business_items,
              defaultSelectedKeys: [
                businessData.businessNature.toLocaleLowerCase(),
              ],
              onClick: onBussinessItemClick,
            }}
            trigger={["click"]}
            className={`w-44`}
          >
            <Button
              title={businessItem}
              iconPlacement="right"
              icon={
                <MdKeyboardArrowDown
                  className={`text-primary text-xl group-hover:text-white`}
                />
              }
            />
          </Dropdown>
        </div>
        <div className={`mt-4 border-2 border-fade-white p-4 rounded-lg`}>
          <h3 className={`text-dark-blue mb-3 font-semibold`}>Optional:</h3>
          <div className={`flex gap-4`}>
            <DashboardInput
              name={
                formState.businessNature === "INDIVIDUAL"
                  ? `individualNbr`
                  : `businessRegistrationNbr`
              }
              title={
                formState.businessNature === "INDIVIDUAL"
                  ? `Individual Number`
                  : `Business Registration Number`
              }
              placeholder="Enter Number"
              onChange={onChangehandler}
              value={
                formState.businessNature === "INDIVIDUAL"
                  ? formState.individualNbr
                  : formState.businessRegistrationNbr
              }
            />
            <DashboardInput
              name={
                formState.businessNature === "INDIVIDUAL"
                  ? `individualTaxIdNbr`
                  : `businessTaxIdNbr`
              }
              title={
                formState.businessNature === "INDIVIDUAL"
                  ? `Individual Tax Id Number`
                  : `Business Tax Id Number`
              }
              value={
                formState.businessNature === "INDIVIDUAL"
                  ? formState.individualTaxIdNbr
                  : formState.businessTaxIdNbr
              }
              placeholder="Enter Number"
              onChange={onChangehandler}
            />
          </div>
        </div>
      </div>

      {/* {formType == "events" && (
        <div
          className={`grid grid-rows-1 grid-cols-2 gap-4 mt-8 border-2 border-fade-white p-4 rounded-lg`}
        >
          <div className={`border-2 border-fade-white p-4 rounded-lg`}>
            <h3 className={`text-dark-blue mb-3 font-semibold`}>
              I'm offering a...
            </h3>
            <RadioBox
              items={business_offer}
              onChange={(e: RadioChangeEvent) =>
                onRadioChange(e, "businessOffer")
              }
              value={formState.businessOffer}
            />
          </div>

          {formState.businessOffer === 2 && (
            <div className={`border-2 border-fade-white p-4 rounded-lg`}>
              <h3 className={`text-dark-blue mb-3 font-semibold`}>
                Would be...
              </h3>
              <RadioBox
                items={business_offer_experience_type}
                onChange={(e: RadioChangeEvent) =>
                  onRadioChange(e, "businessEvent")
                }
                value={formState.businessEvent}
              />
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default BusinessForm;
