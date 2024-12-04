import { SVGProps } from 'react';

export const RightArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        d='M7.5 15L12.5 10L7.5 5'
        stroke='#0F172A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
