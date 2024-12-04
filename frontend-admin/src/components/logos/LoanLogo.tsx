import { SVGProps } from 'react';
export const LoanLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <rect width='40' height='40' rx='10' fill='#0E1A39' />
      <path
        d='M20 21C22.7614 21 25 18.7614 25 16C25 13.2386 22.7614 11 20 11C17.2386 11 15 13.2386 15 16C15 18.7614 17.2386 21 20 21ZM20 21C22.1217 21 24.1566 21.8429 25.6569 23.3431C27.1571 24.8434 28 26.8783 28 29M20 21C17.8783 21 15.8434 21.8429 14.3431 23.3431C12.8429 24.8434 12 26.8783 12 29'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
