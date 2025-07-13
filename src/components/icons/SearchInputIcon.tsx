import React from 'react';
import { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

interface SearchInputIconProps extends SvgProps {
  size?: number;
  color?: string;
}

const SearchInputIcon: React.FC<SearchInputIconProps> = ({
  size = 24,
  color = '#A6A6A6',
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
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M22 22L20 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SearchInputIcon;
