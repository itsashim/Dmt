/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { AddUpdateRoom } from "../../../../components";
import { useParams } from "react-router";
import { useAppSelector } from "../../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../../redux/store";

const StaysEditRoomPage: FC = () => {
  const { id: placeId, editId: roomId } = useParams();
  const { rooms } = useAppSelector((state: RootAppState) => state.places);
  const room = rooms?.find(
    ({ id, place_id }) => id === Number(roomId) && place_id === Number(placeId)
  );

  return <AddUpdateRoom method="update" data={room} roomId={Number(roomId)} />;
};

export default StaysEditRoomPage;
