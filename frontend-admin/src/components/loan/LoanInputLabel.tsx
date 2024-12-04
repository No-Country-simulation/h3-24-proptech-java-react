import { useState } from 'react';

interface Props {
  label: string;
  value: string;
  enable: boolean;
}

export const LoanInputLabel = ({ label, value, enable }: Props) => {
  const [text, setText] = useState<string>(value);
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-sm font-semibold'>{label}</p>
      <input
        className='flex items-center border rounded-sm h-10 px-3 text-[#71717A]'
        value={text}
        disabled={!enable}
        onChange={(e) => setText(e.target.value)}
      />
      {/* {value ? value : 'xxxxxxx'}
      </input> */}
    </div>
  );
};
