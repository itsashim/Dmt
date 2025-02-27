import { CSSProperties, FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

const Section: FC<SectionProps> = ({ id, children, className, style }) => {
  return (
    <section
      id={id}
      className={`block ${className?.toLowerCase()} py-6 md:py-20`}
      style={style}
    >
      {children}
    </section>
  );
};

export default Section;
