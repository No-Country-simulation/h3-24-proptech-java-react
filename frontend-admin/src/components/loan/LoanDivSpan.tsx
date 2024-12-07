interface LoanDivSpanProps {
  label: string;
  value: string;
  span: string;
}

export const LoanDivSpan = ({ label, value, span }: LoanDivSpanProps) => {
  return (
    <div className='flex  items-center justify-between'>
      <p className='text-[#475569] text-sm'>{label}</p>
      <p>
        {value} <span className='font-semibold'>{span}</span>
      </p>
    </div>
  );
};
