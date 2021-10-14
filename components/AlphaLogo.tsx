import { SVGProps } from 'react';

const AlphaLogo = (svgProps: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" {...svgProps}>
      <defs>
        <clipPath id="clip-transparent-logo">
          <rect width="180" height="180" />
        </clipPath>
      </defs>
      <g id="transparent-logo" clipPath="url(#clip-transparent-logo)">
        <text
          id="a"
          transform="translate(30 146)"
          fill="#fff"
          fontSize="201"
          fontFamily="Monaco"
        >
          <tspan x="0" y="0">
            a
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export { AlphaLogo };
