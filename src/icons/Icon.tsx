import React from "react";
import {Image} from "@nextui-org/react";

interface IconProps {
  src: string;
  size?: number;
  height?: number;
  width?: number;
}

export const Icon: React.FC<IconProps> = ({
  src,
  size = 24,
  height = 24,
  width = 24,
}) => {
  return (
      <Image
          src={src}
          alt="Gemstone"
          width={size || width}
          height={size || height}
      />
  );
};



