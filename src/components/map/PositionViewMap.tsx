import { FC } from "react";

import Map from "./Map";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { Images, Svg } from "../../assets";

const customIcon = new Icon({
  iconUrl: Svg.marker,
  iconSize: [50, 50],
});

// type LatLng = {
//   lat: number;
//   lng: number;
// };

// const coordinates: LatLng[] = [
//   { lat: 40.712776, lng: -74.005974 },
//   { lat: 34.052235, lng: -118.243683 },
//   { lat: 51.507351, lng: -0.127758 },
//   { lat: 48.856613, lng: 2.352222 },
//   { lat: 35.689487, lng: 139.691711 },
//   { lat: -33.86882, lng: 151.20929 },
//   { lat: 55.755825, lng: 37.617298 },
//   { lat: 19.432608, lng: -99.133209 },
//   { lat: 28.613939, lng: 77.209023 },
//   { lat: -23.55052, lng: -46.633308 },
// ];

interface Props {
  position: {
    lat: number;
    lng: number;
  };
}

const PositionViewMap: FC<Props> = ({ position }) => {
  return (
    <div className={`relative w-full h-full`}>
      <Map>
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className={`w-60 rounded overflow-hidden`}>
              {/* <div
                className={`w-fit`}
              >{`You clicked at ${coordinates.lat}, ${coordinates.lng}`}</div> */}
              <figure className={`mt-2`}>
                <img
                  className={`object-cover object-center`}
                  src={Images.download_bg}
                />
              </figure>
            </div>
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};

export default PositionViewMap;
