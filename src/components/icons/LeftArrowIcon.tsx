import React from 'react';
import { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

interface LeftArrowIconProps extends SvgProps {
  size?: number;
  color?: string;
}

const LeftArrowIcon: React.FC<LeftArrowIconProps> = ({
  size = 24,
  color = '#19191B',
  width,
  height,
  ...props
}) => {
  const iconWidth = width || size;
  const iconHeight = height || size;

  return (
    <Svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 18 16"
      fill="none"
      {...props}
    >
      <Path
        d="M18 6.8532H3.74194L8.91593 1.44482L7.53372 0L0 7.875L7.53372 15.75L8.91593 14.3052L3.74194 8.8968H18V6.8532Z"
        fill={color}
      />
    </Svg>
  );
};

export default LeftArrowIcon;
