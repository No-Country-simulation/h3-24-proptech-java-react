import {
  Bot,
  CircleHelp,
  CircleUserRound,
  Send,
  SendHorizontal,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { sendMessage } from '../../services/apiChatBot';

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
  const [messages, setMessages] = useState([
    {
      sender: 'Carlos-bot',
      message:
        'Hola soy Carlos, estoy aqui para ayudarte a resolver tus dudas.',
    },
    {
      sender: 'Carlos-bot',
      message: 'Te comparto algunas preguntas frecuentes',
    },
    {
      sender: 'preguntas-frecuentes',
      message: '¿Qué requisitos debo cumplir para solicitar un préstamo?',
    },
    {
      sender: 'preguntas-frecuentes',
      message: '¿Puedo adelantar el pago de mis cuotas?',
    },
    {
      sender: 'preguntas-frecuentes',
      message: '¿Qué pasa si no puedo pagar una cuota a tiempo?',
    },
    {
      sender: 'preguntas-frecuentes',
      message: '¿Cuánto tiempo tarda en aprobarse un préstamo?',
    },
  ]);

  const [text, setText] = useState('');
  const copyQuestion = (message) => {
    console.log(message);
    sendMessages(message);
  };

  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessages = async (text) => {
    if (text.length < 10) {
      toast.error('El mensaje debe ser mayor a 10 caracteres');
    } else {
      const message = await sendMessage(text);
      const newUserMessage = {
        sender: 'user',
        message: text,
      };
      const newChatBotMessage = {
        sender: 'Carlos-bot',
        message: message,
      };
      setMessages([...messages, newUserMessage, newChatBotMessage]);
      setText('');
    }
  };
  return (
    <div ref={chatRef}>
      <div
        className='fixed bottom-10 right-10 cursor-pointer transition-all hover:scale-110 bg-white text-[#2962FF] w-14 h-14 flex justify-center items-center rounded-full shadow-xl border '
        onClick={() => setShow(!show)}>
        <Bot />
      </div>

      <div
        className={`fixed bg-[#0E1A39] z-50  rounded-3xl left-1/2 md:left-auto transform -translate-x-1/2 md:transform-none top-10  md:top-auto md:bottom-28 md:right-12 shadow-xl border border-[#94A3B8] ${
          show
            ? 'w-[95%] h-[80%]  md:w-[400px] md:h-[500px] opacity-100 scale-100'
            : 'opacity-0 scale-90 w-0 h-0'
        } transition-all duration-300 ease-in-out`}>
        <div className=' h-full flex flex-col  '>
          <div className=' h-5/6  px-6 py-6 flex flex-col gap-5 overflow-y-scroll  '>
            {messages.map((c, i) =>
              c.sender === 'Carlos-bot' ? (
                <div
                  key={i}
                  className='flex items-start pr-2 justify-start gap-4 '>
                  <Bot className=' min-w-[50px] h-[50px] rounded-md px-2 shadow-md bg-[#2962FF] text-white  ' />
                  <p className='bg-[#2962FF] py-2 px-4 text-white rounded-md'>
                    {c.message}
                  </p>
                </div>
              ) : c.sender === 'preguntas-frecuentes' ? (
                <div
                  key={i}
                  className='flex items-start pr-2 justify-start gap-4 '>
                  <CircleHelp className=' min-w-[50px] h-[50px] rounded-md px-2 shadow-md bg-slate-400 text-white  ' />
                  <p
                    className='bg-[#888d99] py-2 px-4 text-white rounded-md cursor-pointer'
                    onClick={() => copyQuestion(c.message)}>
                    {c.message}
                  </p>
                </div>
              ) : (
                <div key={i} className='flex items-start  justify-end gap-2 '>
                  <p className='bg-white  py-2 px-4 rounded-md '>{c.message}</p>
                  <CircleUserRound className='min-w-[50px] h-[50px] rounded-md px-2 shadow-md bg-white text-[#2962FF]' />
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className='w-full h-1/6 bg-white  rounded-b-3xl flex justify-between items-center  px-4'>
            <input
              type='text'
              className='w-4/5 h-[50px] bg-[#F8FAFC] '
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className='bg-[#2962FF]  flex justify-center p-3 text-white rounded-md shadow-md hover:scale-105 hover:bg-[#1F47B4] '
              onClick={() => sendMessages(text)}>
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
