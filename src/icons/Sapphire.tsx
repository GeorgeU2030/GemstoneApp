import React from "react";
import {Image} from "@nextui-org/react";

interface HeartIconProps {
  fill?: string;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
}

export const Sapphire: React.FC<HeartIconProps> = ({
  size = 24,
  height = 24,
  width = 24,
}) => {
  return (
      <Image
          src="/saphire.png"
          alt="Gemstone"
          width={size || width}
          height={size || height}
      />
  );
};