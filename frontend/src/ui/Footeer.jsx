import { Instagram, Linkedin, Facebook, AtSign } from 'lucide-react';
import styles from './footer.module.css';
import { Link, useNavigate } from 'react-router-dom';

import Logo from './Logo';
import { TextLogoWhite } from './TextLogoWhite';

export const Footeer = () => {
  const navigate = useNavigate();

  const productLinks = [
    { name: 'Home', path: '/' },
    { name: 'Panel de inversión', path: '/inversor' },
    { name: 'Préstamo', path: '/prestamo' },
    { name: 'Tabla de cuotas', path: '/cuotas' },
  ];

  const legalLinks = [
    { name: 'Términos', path: '/terms' },
    { name: 'Privacidad', path: '/privacy' },
    { name: 'Cookies', path: '/cookies' },
    { name: 'Licencias', path: '/licencia' },
    { name: 'Ajustes', path: '/ajuste' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const socialLinks = [
    { icon: <Instagram size={24} />, url: 'https://instagram.com' },
    { icon: <Linkedin size={24} />, url: 'https://linkedin.com' },
    { icon: <Facebook size={24} />, url: 'https://facebook.com' },
    { icon: <AtSign size={24} />, url: 'mailto:correo@financiaal.com' },
  ];

  return (
    <footer className={`${styles.footerBackground} text-white py-10`}>
      <div className='container mx-auto px-4 space-y-12'>
        {/* Call to Action Section */}
        <div className='text-start flex flex-col w-[90%] m-auto   lg:text-left lg:flex lg:items-center lg:justify-between lg:gap-8'>
          {/* Contenedor para título y párrafo */}
          <div className='w-[90%] md:w-auto'>
            <h3 className='text-2xl font-bold mb-4'>
              Tu préstamo personal. Más fácil que nunca.
            </h3>
            <p className='mb-6 text-gray-300'>
              Solicita tu préstamo personal a largo plazo y compra lo que
              necesites, hoy.
            </p>
          </div>
          <div className=' text-center'>
            <button
              className=' w-[273px] md:w-[486px] font-semibold text-white h-[51px] rounded-md bg-[#2962FF] hover:bg-blue-500'
              onClick={() => navigate('/loan-simulation')}>
              Simular préstamo
            </button>
          </div>
          {/* Botón */}
        </div>

        <hr />

        {/* Logo, Description, and Links Section */}
        <div className='lg:flex lg:justify-between lg:items-start'>
          {/* Logo y Descripción (30%) */}

          <div
            className={`${styles.footerAdjust_LogoDescription}  w-[90%] m-auto md:w-auto text-center lg:text-left mt-8 lg:mt-0 mb-12`}>
            <div className='text-center mb-8 flex items-center gap-1 justify-start'>
              <Logo />
              <TextLogoWhite />
            </div>
            <p className='text-gray-300 text-start lg:text-justify'>
              Financia tus compras de hoy, y págalas mañana. Gracias por confiar
              en nuestros activos.
            </p>
          </div>

          {/* Links Section (70%) */}
          <div
            className={`${styles.footerAdjust_LinkSection} grid grid-cols-2 gap-8 lp:gap-4 text-start lg:text-right  w-[90%] m-auto md:w-auto`}>
            {[
              { title: 'Producto', links: productLinks },
              { title: 'Legales', links: legalLinks },
            ].map((section) => (
              <div key={section.title}>
                <h6 className='text-sm text-[#E2E8F0] font-bold mb-4'>
                  {section.title}
                </h6>
                <ul className='space-y-2'>
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className='hover:text-blue-300'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Línea divisoria y redes sociales */}
        <hr />
        <div className='flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0'>
          {/* Copyright */}
          <p className='text-sm text-gray-300 lg:order-1 lg:self-start'>
            &copy; 2024 Financiaal. Todos los derechos reservados.
          </p>

          {/* Redes Sociales */}
          <div className={`${styles.socialIcons} flex space-x-6 lg:order-2`}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-blue-300'>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
