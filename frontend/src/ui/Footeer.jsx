import { Instagram, Linkedin, Facebook, AtSign } from 'lucide-react';
import styles from './footer.module.css';
import { Link } from 'react-router-dom';

export const Footeer = () => {
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
        <div className='text-center lg:text-left lg:flex lg:items-center lg:justify-between lg:gap-8'>
          {/* Contenedor para título y párrafo */}
          <div>
            <h3 className='text-2xl font-bold mb-4'>
              Tu préstamo personal. Más fácil que nunca.
            </h3>
            <p className='mb-6 text-gray-300'>
              Solicita tu préstamo personal a largo plazo y compra lo que
              necesites, hoy.
            </p>
          </div>

          {/* Botón */}
          <Link to='/calculator' className={`${styles.ctaButton} inline-block`}>
            Simula tu préstamo
          </Link>
        </div>

        {/* Logo, Description, and Links Section */}
        <div className='lg:flex lg:justify-between lg:items-start'>
          {/* Logo y Descripción (30%) */}

          <div
            className={`${styles.footerAdjust_LogoDescription} text-center lg:text-left mt-8 lg:mt-0`}>
            <img
              className='mx-auto lg:mx-0 mb-4 max-h-16'
              src='/logo_Financia-White.png'
              alt='Logo Financia'
            />
            <p className='text-gray-300 text-center lg:text-justify'>
              Financia tus compras de hoy, y págalas mañana. Gracias por confiar
              en nuestros activos.
            </p>
          </div>

          {/* Links Section (70%) */}
          <div
            className={`${styles.footerAdjust_LinkSection} grid grid-cols-2 gap-8 lp:gap-4 text-center lg:text-right`}>
            {[
              { title: 'Producto', links: productLinks },
              { title: 'Legales', links: legalLinks },
            ].map((section) => (
              <div key={section.title}>
                <h6 className='text-lg font-bold mb-4'>{section.title}</h6>
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
        <hr className='border-white/20 my-8' />
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
