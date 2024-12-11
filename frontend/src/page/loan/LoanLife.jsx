import { useEffect, useState } from 'react';
import { LoanGuarantorData } from './components/LoanGuarantorData';
import { LoanPersonalData } from './components/LoanPersonalData';
import { LoanSummary } from './components/LoanSummary';
import { PersonalSettings } from './components/PersonalSettings';
import { QuotesToPay } from './components/QuotesToPay';
import { useProfile } from '../../context/ProfileContext';
import { useLoan } from '../../context/LoanContext';
import Spinner from '../../ui/Spinner';

export const LoanLife = () => {
  const { profile, getProfile } = useProfile();
  const { loanFullData, getLoan, isPending } = useLoan();
  useEffect(() => {
    if (!profile) getProfile();
    if (!loanFullData) getLoan();
  }, []);
  const links = [
    {
      title: 'Datos personales',
      component: <LoanPersonalData loan={loanFullData} profile={profile} />,
    },
    { title: 'Resumen de tu prestamo', component: <LoanSummary /> },
    { title: 'Datos de garantes', component: <LoanGuarantorData /> },
    { title: 'Cuotas a pagar', component: <QuotesToPay /> },
    { title: 'Ajustes personales', component: <PersonalSettings /> },
  ];
  console.log({
    loanFullData,
    profile,
  });
  console.log(isPending);
  const [currentLink, setCurrentLink] = useState('Datos personales');
  return (
    <div className='lg:w-[80%] m-auto mb-10'>
      <div>
        <ul className='flex gap-4 text-[#475467] border md:w-[60%] lg:w-[80%] justify-center  min-w-[800px] max-w-[800px] py-2 rounded-md '>
          {links.map((d, i) => (
            <li
              key={i}
              className={`cursor-pointer px-2 transition-all duration-200 py-1 rounded-md text-sm ${
                d.title === currentLink &&
                'bg-[#2962FF] hover:bg-[#1F47B4]   text-white font-bold'
              } `}
              onClick={() => setCurrentLink(d.title)}>
              {d.title}
            </li>
          ))}
        </ul>
      </div>
      {links
        .filter((e) => e.title === currentLink)
        .map((l, i) => (
          <div key={i} className=''>
            {l.component}
          </div>
        ))}
      {isPending && (
        <div className='z-50 inset-0 backdrop-blur-md fixed '>
          <div className=' w-full h-full flex justify-center items-center'>
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};
