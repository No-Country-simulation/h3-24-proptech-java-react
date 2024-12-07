import { useNavigate } from 'react-router-dom';

import logoHome from '../../public/img/logo-home.png';

import Nav from '../ui/Nav';
import { Footeer } from '../ui/Footeer';
import {
  BadgeCheck,
  Folders,
  Globe,
  Lock,
  MonitorSmartphone,
  Zap,
} from 'lucide-react';
import { InversoresImg } from '../ui/InversoresImg';

const data = [
  {
    icon: <Globe />,
    title: 'Proceso 100% online',
    paragraph:
      'Todo el proceso es 100% en línea, desde nuestra plataforma web o aplicación móvil, permitiéndote realizarlo desde la comodidad de tu hogar, en el momento que mejor te convenga.',
  },
  {
    icon: <Lock />,
    title: 'Protegemos tu información',
    paragraph:
      'Nos comprometemos a protegerte con los más altos estándares de privacidad y seguridad, cumpliendo con las regulaciones aplicables para garantizar que tu experiencia sea confiable y sin riesgos.',
  },
  {
    icon: <BadgeCheck />,
    title: 'Garantizamos la transparencia',
    paragraph:
      'No hay sorpresas ni costos ocultos. Te mostramos toda la información de manera clara, para que siempre sepas dónde estás y qué puedes esperar.',
  },
  {
    icon: <Zap />,
    title: 'Recibí tus fondos en instantes',
    paragraph:
      'Luego de completar el proceso de evaluación del préstamo, vas a poder encontrar los fondos directamente depositados en tu cuenta bancaria sin demoras.',
  },
  {
    icon: <Folders />,
    title: 'Organización simplificada',
    paragraph:
      'Nuestra plataforma está diseñada para que gestiones tus finanzas de forma ordenada y eficiente. Todo en un solo lugar, fácil de entender y usar.',
  },
  {
    icon: <MonitorSmartphone />,
    title: 'Portal responsive',
    paragraph:
      'Con solo un celular o computadora, puedes acceder a todos nuestros servicios desde donde estés, cuando lo necesites. Sin filas, sin horarios limitados.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=' text-black w-full   m-auto'>
      <Nav />
      <section
        className={`text-center w-full pt-32  md:py-8 flex flex-col md:flex-row md:items-center  md:justify-between md:pl-12 relative `}>
        <div className='md:w-1/3 w-full text-start flex flex-col gap-8'>
          <div className='flex flex-col items-center px-8 md:px-0  gap-6 '>
            <h2 className='text-[#1F47B4] text-start   font-bold text-6xl md:text-7xl'>
              Triplicamos los montos y plazos
            </h2>
            <p className='text-[#142B6A] text-xl md:text-2xl  md:w-[76%]'>
              Solicita tu préstamo personal a largo plazo y compra lo que
              necesites, hoy.
            </p>
          </div>
          <div className='flex flex-col items-center md:items-start gap-3'>
            <button
              className=' w-[273px] md:w-[486px] text-white h-[51px] rounded-md bg-[#2962FF] hover:bg-blue-500'
              onClick={() => navigate('/loan-simulation')}>
              Simular préstamo
            </button>
            <button className=' w-[273px] md:w-[486px] h-[51px] rounded-md text-[#2962FF] border-2 font-semibold border-[#2962FF] hover:border-blue-500 hover:text-blue-500 '>
              Quiero invertir
            </button>
          </div>
        </div>
        <div className='w-[80%] md:w-auto flex ml-20 md:ml-auto  '>
          <img src={logoHome} alt='' className='' />
        </div>
        <p className='text-xs ml-2 text-[#64748B] w-[215px] md:w-full text-start absolute bottom-8 left-0'>
          Financia.al es una financiera exclusiva para compra y financiación de
          terrenos.
        </p>
      </section>

      <section className='bg-[#142B6A] pt-8 pb-9 flex flex-col md:flex-row md:justify-between  md:relative  md:px-[120px]'>
        <div className='flex flex-col  items-start pb-[4.5rem] md:w-[486px]  px-8 md:px-0  gap-6 '>
          <h2 className='text-white text-start font-bold text-6xl md:text-5xl'>
            Quienes somos?
          </h2>
          <p className='text-white text-start  text-[1rem] md:text-[1.4rem] w-[272px]  md:w-auto'>
            En <span className='font-semibold'>Financia.al</span>, somos una
            plataforma financiera multiproducto comprometida con transformar la
            vida de los latinoamericanos.
          </p>
          <p className='text-white text-start  text-[1rem] md:text-[1.4rem] w-[272px]  md:w-[76%]'>
            Ofrecemos una amplia gama de soluciones que incluyen planes de
            ahorro, inversión y préstamos personales.
          </p>
        </div>

        <div className='md:w-[486px] flex flex-col  '>
          <div className='w-[297px] md:w-[486px] border m-auto border-[#94A3B8]'></div>

          <div className='flex flex-col  items-start pl-4  m-auto pb-12 pt-5   md:px-0  gap-6  w-[297px] md:w-[486px] '>
            <h2 className='text-white text-start tracking-widest md:tracking-wide  font-bold text-6xl md:text-9xl'>
              10 años
            </h2>
            <p className='text-white text-start  text-[1rem] md:text-2xl w-[272px]  md:w-[76%]'>
              de trayectoria
            </p>
          </div>

          <div className='w-[297px] md:w-[486px] border m-auto border-[#94A3B8]'></div>

          <div className='flex  items-start pl-4  m-auto pb-12 pt-5   md:px-0  gap-6  w-[297px] md:w-[486px] '>
            <div className=' w-1/2 flex flex-col gap-3'>
              <h2 className='text-white text-start tracking-widest   font-bold text-6xl md:text-7xl'>
                +1K
              </h2>
              <p className='text-white text-start  text-[1rem] md:text-2xl  md:w-[76%]'>
                Personas impactadas
              </p>
            </div>
            <div className='w-1/2 flex flex-col gap-3'>
              <h2 className='text-white text-start tracking-widest   font-bold text-6xl md:text-7xl'>
                21
              </h2>
              <p className='text-white text-start  text-[1rem] md:text-2xl   md:w-[76%]'>
                Países en todo LATAM
              </p>
            </div>
          </div>
        </div>

        <div className='w-[297px] md:w-auto m-auto pl-4 md:pl-0 md:absolute md:bottom-16 '>
          <h4 className='text-white font-bold'>
            Financiamientos con amplia trayectoria.
          </h4>
        </div>
      </section>
      <section className='pt-8 pb-9 md:pt-24'>
        <h2 className='text-[#1F47B4] text-center   font-bold text-5xl md:text-5xl'>
          Nuestros Prestamos Personales
        </h2>

        <div className='flex flex-col md:grid md:grid-flow-col md:grid-cols-3 md:grid-rows-2 md:w-[1200px] md:m-auto  gap-11 md:gap-y-12 md:gap-x-4 items-center mt-11 md:mt-10'>
          {data.map((d, i) => (
            <div
              key={i}
              className='flex flex-col gap-3 px-6 py-3 rounded-md text-[#1f47b4] bg-[#F8FAFC] w-[271px] md:w-[384px]  md:h-[220px]'>
              <div className='font-bold'>{d.icon}</div>
              <h4 className='font-bold text-xl'>{d.title}</h4>
              <p className='text-black'>{d.paragraph}</p>
            </div>
          ))}
        </div>

        <div className='mt-12 hidden md:flex w-[297px] md:w-[486px] border m-auto border-[#94A3B8]'></div>
      </section>

      <section className='pt-8 pb-20  md:pb-9  md:flex md:justify-between relative'>
        <div className='flex flex-col md:gap-52 items-center mb-12 px-8 md:px-0  gap-6  md:w-2/3 md:relative '>
          <div className='md:w-[486px] flex flex-col gap-7'>
            <h2 className='text-[#142B6A] text-start   font-bold text-6xl md:text-5xl'>
              Panel Para Inversores
            </h2>
            <p className='text-[#142B6A] text-start  text-[1rem] md:text-2xl w-[272px] md:w-auto '>
              En <span className='font-semibold'>Financia.al</span>, también
              contemplamos a los inversores que confían en nuestro capital y
              nuestro rubro; por eso proveemos un panel con métricas que
              permiten analizar el rendimiento de tus inversiones a lo largo del
              tiempo.
            </p>
          </div>
          <div className='flex flex-col items-center md:relative absolute   '>
            <button className=' w-[273px] md:w-[486px] h-[51px] rounded-md text-[#2962FF] border-2 font-semibold border-[#2962FF] hover:border-blue-500 hover:text-blue-500 '>
              Quiero invertir
            </button>
          </div>
        </div>
        <div className=' flex flex-col items-end md:w-1/3  md:h-[784px]'>
          {/* <InversoresImg /> */}
          <img src='./Browsers.png' className='md:w-[640px] md:h-[784px]' />
        </div>
      </section>

      <Footeer />
    </div>
  );
};

export default Home;
