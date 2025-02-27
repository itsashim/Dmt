/* eslint-disable @typescript-eslint/no-explicit-any */

import { message } from "antd";
import { FC } from "react";
import api from "../../../../api";
import { useAppDispatch } from "../../../../hooks/useTypedSelectors";
import { removeEventsFromStore } from "../../../../redux/reducers/events";
import { DeleteButton } from "../../../../components";

interface Props {
  id: number;
}

const DeleteEvent: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await api.delete(`/events/${id}`);

      dispatch(removeEventsFromStore(id));
      message.success("Successfully Deleted!");
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };

  return <DeleteButton onClick={handleDelete} />;
};

export default DeleteEvent;
