import { Bot, CircleUserRound, SendHorizontal } from 'lucide-react';
import { useState } from 'react';

const chat = [
  {
    sender: 'Carlos-bot',
    message: 'Hola soy Carlos, soy tu guia',
  },
  {
    sender: 'user',
    message: 'Que necesito para sacar un prestamo?',
  },
  {
    sender: 'Carlos-bot',
    message: 'Hola para sacar un prestamo necesitas guita',
  },
  {
    sender: 'user',
    message: 'Cuanto es el plazo de pago ?',
  },
  {
    sender: 'Carlos-bot',
    message:
      'Los plazos de pago pueden variar desde 6 meses hasta 180 meses Los plazos de pago pueden variar desde 6 meses hasta 180 mesesLos plazos de pago pueden variar desde 6 meses hasta 180 meses',
  },
  {
    sender: 'Carlos-bot',
    message:
      'Los plazos de pago pueden variar desde 6 meses hasta 180 meses Los plazos de pago pueden variar desde 6 meses hasta 180 mesesLos plazos de pago pueden variar desde 6 meses hasta 180 meses',
  },
];

export const ChatBot = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div
        className='fixed bottom-10 right-10 cursor-pointer transition-all hover:scale-110 bg-[#CBD5E1] w-14 h-14 flex justify-center items-center rounded-full shadow-xl border '
        onClick={() => setShow(!show)}>
        <Bot />
      </div>

      <div
        className={`fixed bg-[#CBD5E1] p-2 rounded-tr-xl rounded-tl-md rounded-bl-md bottom-16 right-24 shadow-xl border border-[#94A3B8] ${
          show
            ? 'w-[400px] h-[500px] opacity-100 scale-100'
            : 'opacity-0 scale-90 w-0 h-0'
        } transition-all duration-300 ease-in-out`}>
        <div className='bg-slate-400 h-full flex flex-col '>
          <div className='bg-slate-800 h-5/6 rounded-tr-md px-2 py-6 rounded-tl-md flex flex-col gap-5 overflow-auto '>
            {chat.map((c, i) =>
              c.sender === 'Carlos-bot' ? (
                <div
                  key={i}
                  className='flex items-start pr-2 justify-start gap-4 '>
                  <Bot className=' min-w-[50px] h-[50px] rounded-md px-2 shadow-md bg-red-50  ' />
                  <p className='bg-[#D2DEFF] py-2 px-4 rounded-md'>
                    {c.message}
                  </p>
                </div>
              ) : (
                <div key={i} className='flex items-start  justify-end gap-2 '>
                  <p className='bg-[#8AA9FF] py-2 px-4 rounded-md '>
                    {c.message}
                  </p>
                  <CircleUserRound className='min-w-[50px] h-[50px] rounded-md px-2 shadow-md bg-red-50' />
                </div>
              )
            )}
          </div>
          <form
            action=''
            className='w-full h-1/6 flex justify-between items-center gap-2  px-4'>
            <textarea type='text' className='w-4/5 h-[50px] ' />
            <button className='bg-[#2962FF] w-1/5 flex justify-center px-2 py-1 text-white rounded-md shadow-md hover:scale-105 hover:bg-[#1F47B4] '>
              <SendHorizontal />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
