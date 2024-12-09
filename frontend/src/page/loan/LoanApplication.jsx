import { Outlet } from 'react-router-dom';

function LoanApplication() {
  return (
    <section className='pt-8'>
      {/* <Bar /> */}

      <div className='px-5'>
        <Outlet />
      </div>
    </section>
  );
}

export default LoanApplication;
