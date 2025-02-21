import { FC, ReactNode } from "react";

interface Props {
  title: string;
  id?: string;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "filled" | "outline";
  iconPlacement?: "center" | "left" | "right";
}

const Button: FC<Props> = ({
  icon,
  title,
  id,
  onClick,
  className,
  disabled = false,
  variant = `outline`,
  iconPlacement = "left",
}) => {
  return (
    <button
      id={id}
      type={`button`}
      onClick={onClick}
      disabled={disabled}
      className={`${className} group ${
        icon &&
        `flex ${
          iconPlacement === "center" ? `justify-center` : `justify-between`
        }   items-center gap-2`
      } ${
        variant === "outline"
          ? `bg-white ring-1 ring-primary hover:ring-white hover:bg-primary ${
              !disabled && `hover:opacity-70`
            } `
          : `bg-primary ring-1 ring-primary hover:ring-primary hover:bg-white ${
              !disabled && `hover:opacity-70`
            } }`
      }  ${
        disabled ? `opacity-40 cursor-not-allowed` : `opacity-100`
      } rounded-md smooth px-3 py-2 shadow-sm text-center min-w-24`}
    >
      {iconPlacement === "left" && icon}
      {iconPlacement !== "left" &&
        iconPlacement !== "right" &&
        iconPlacement === "center" &&
        icon}
      <span
        className={`text-base font-semibold capitalize ${
          variant === "outline"
            ? `text-primary group-hover:text-white`
            : `text-white group-hover:text-primary`
        }`}
      >
        {title}
      </span>
      {iconPlacement === "right" && icon}
    </button>
  );
};

export default Button;
