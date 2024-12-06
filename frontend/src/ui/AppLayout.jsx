import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import { ChatBot } from '../features/chat/ChatBot';

function AppLayout() {
  return (
    <>
      <Nav />

      <main className='pt-[32px]'>
        <Outlet />
        <ChatBot />
      </main>
    </>
  );
}

export default AppLayout;
