import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Container: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`relative px-4 md:max-w-6xl lg:max-w-7xl xl:max-w-[110rem] mx-auto w-full h-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
