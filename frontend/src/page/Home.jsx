import React from 'react';
import { Link } from 'react-router-dom';

import mujerCafe from './img/mujer_cafe.png';
import hombreNotebook from './img/hombre_notebook_living.png';
import hombreCafe from './img/hombre_cafe.png';
import Navbar from '../ui/navbar';
import Footer from '../ui/footer';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className="bg-white text-black">
      {/*    <Navbar />
 */}

      <section className={`text-justify py-8 ${styles.wrapper}`}>
        <h1 className={`${styles.logo} colorText-financia`}>Financia.al</h1>
        <h2 className={`${styles.h2} mx-auto max-w-4xl`}>
          La respuesta a tus necesidades económicas, todo en un solo espacio.
        </h2>
        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/prestamo"
            className={`${styles.button} px-6 py-2 rounded-full`}
          >
            Simular préstamo
          </Link>
          <Link
            to="/inversion"
            className={`${styles.button} px-6 py-2 rounded-full`}
          >
            Quiero invertir
          </Link>
        </div>
      </section>


      <main>

        <section className="py-8 px-4 md:py-12 md:px-8">
          <h2 className="text-3xl font-bold mb-4 md:text-4xl colorText-financia">Quiénes somos</h2>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            <img
              src={mujerCafe} alt="Mujer tomando café" className="w-full rounded-md md:w-1/2"
            />
            <p className="text-lg text-justify">
              En <span className="colorText-financia">Financia.al</span>, somos una plataforma financiera multiproducto comprometida con transformar la vida de los latinoamericanos. <br />
              Ofrecemos una amplia gama de soluciones que incluyen planes de ahorro, inversión y préstamos personales. <br />
              Diseñamos productos financieros en línea que no solo simplifican tus finanzas, sino que también te ayudan a alcanzar tus metas y hacer realidad tus sueños. <br />
              Con más de X años de experiencia, hemos logrado impactar positivamente a miles de personas. <br />
              Confía en nosotros para gestionar tus finanzas con transparencia y solidez. <br />
              <span className="colorText-financia">¡En Financia.al estamos aquí para impulsarte!</span>
            </p>
          </div>
        </section>


        <section className="py-8 px-4 md:py-12 md:px-8">
          <h2 className="text-3xl font-bold mb-4 md:text-4xl colorText-financia">Préstamos personales</h2>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            <img src={hombreNotebook} alt="Hombre usando computadora portátil" className="w-full rounded-md md:w-1/2" />
            <p className="text-lg text-justify">
              En <span className="colorText-financia">Financia.al</span>, hacemos que obtener un préstamo sea simple, rápido y sin complicaciones. <br />
              Eliminamos las largas filas y el papeleo innecesario. <br />
              Todo el proceso es 100% en línea, desde nuestra plataforma web o aplicación móvil, permitiéndote realizarlo desde la comodidad de tu hogar, en el momento que mejor te convenga. <br />
              Con nosotros, puedes solicitar tu préstamo personal y recibir los fondos después de confirmar tus datos. Es rápido, seguro y diseñado pensando en ti (los préstamos están sujetos a aprobación). <br />
              En <span className="colorText-financia">Financia.al</span>, priorizamos tu tranquilidad. <br />
              <span className="colorText-financia">Protegemos tu información</span> con los más altos estándares de privacidad y seguridad, cumpliendo con las regulaciones aplicables para garantizar que tu experiencia sea confiable y sin riesgos. <br />
              <span className="colorText-financia">Tu confianza es nuestra prioridad</span>. Estamos aquí para apoyarte a alcanzar tus metas financieras de manera ágil y segura.
            </p>
          </div>
        </section>


    
        <section className="py-8 px-4 md:py-12 md:px-8">
          <h2 className="text-3xl font-bold mb-4 md:text-4xl colorText-financia">Quiénes somos</h2>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            <img src={hombreCafe} alt="Hombre tomando café" className="w-full rounded-md md:w-1/2" />
            <div>
              <p className="text-lg text-justify mb-7">
                Nos diferenciamos porque sabemos lo que necesitas: facilidad, claridad y confianza.
                Por eso, diseñamos una plataforma que pone a tu alcance las mejores soluciones
                financieras de manera sencilla y eficiente.
              </p>
              <div>
                <h3 className="text-xl font-semibold">
                  Aquí tienes las razones que nos hacen destacar:
                </h3>

                <ul className="list-disc pl-6 text-lg text-justify">
                  <li>
                    <strong>Todo online, sin complicaciones:</strong> Olvídate de trámites engorrosos
                    y largas esperas. Desde solicitar un préstamo hasta gestionar tus ahorros, todo se
                    realiza 100% en línea, de forma rápida y segura.
                  </li>
                  <li>
                    <strong>Transparencia garantizada:</strong> No hay sorpresas ni costos ocultos. Te
                    mostramos toda la información de manera clara, para que siempre sepas dónde estás
                    y qué puedes esperar.
                  </li>
                  <li>
                    <strong>Tu tiempo es importante:</strong> Con solo un celular o computadora, puedes
                    acceder a todos nuestros servicios desde donde estés, cuando lo necesites. Sin filas,
                    sin horarios limitados.
                  </li>
                  <li>
                    <strong>Organización simplificada:</strong> Nuestra plataforma está diseñada para que
                    gestiones tus finanzas de forma ordenada y eficiente. Todo en un solo lugar, fácil de
                    entender y usar.
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <div><p className="text-lg text-justify mt-7">
            Además, contamos con más de 10 años de experiencia y hemos ayudado a miles de personas
            a alcanzar sus metas financieras. <br />
            <span className="colorText-financia">Financia.al</span>, más que una plataforma,{" "}
            <span className="colorText-financia">somos un aliado</span> para tus finanzas. Trabajamos para
            brindarte las herramientas necesarias para que tomes decisiones informadas y alcances
            tus sueños. <br />
            ¡El futuro de tus finanzas está aquí, al alcance de un clic!
          </p></div>
        </section>


      </main>

      <Footer />
    </div>
  );
};

export default Home;
