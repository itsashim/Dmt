import { FC } from "react";
import { FaTrash } from "react-icons/fa6";

interface Props {
  onClick: () => void;
}

const DeleteButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className={`bg-red-500/20 p-3 rounded-full`}
      onClick={onClick}
    >
      <FaTrash className={`text-red-500 text-base`} />
    </button>
  );
};

export default DeleteButton;
