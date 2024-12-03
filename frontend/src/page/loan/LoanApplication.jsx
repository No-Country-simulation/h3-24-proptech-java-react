import { Outlet } from 'react-router-dom';
import Bar from '../../ui/Bar';

function LoanApplication() {
  return (
    <section>
      <Bar />

      <div className='px-5 py-8'>
        <Outlet />
      </div>
    </section>
  );
}

export default LoanApplication;
