import { Outlet } from 'react-router-dom';
import Nav from './Nav';

function AppLayout() {
  return (
    <>
      <Nav />

      <main className='pt-14'>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
