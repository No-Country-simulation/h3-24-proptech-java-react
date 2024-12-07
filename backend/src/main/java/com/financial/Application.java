package com.financial;

//import org.springframework.ai.document.Document;
//import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//import java.util.List;
//import java.util.Map;

@SpringBootApplication
public class Application implements CommandLineRunner {
//	private final VectorStore vectorStore;
//
//    public Application(VectorStore vectorStore) {
//        this.vectorStore = vectorStore;
//    }

    public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		List<Document> documents = List.of(
//				// Sección A: Sobre los Préstamos
//				new Document("¿Qué requisitos debo cumplir para solicitar un préstamo?",
//						Map.of("answer", "Debes ser mayor de edad, tener un documento de identidad válido, una cuenta bancaria activa y cumplir con los requisitos de ingresos mínimos establecidos por la plataforma.",
//								"meta", "Sección A - Préstamos")),
//				new Document("¿Cuánto dinero puedo solicitar como préstamo mínimo y máximo?",
//						Map.of("answer", "El monto mínimo es de $X (varía según el país) y el máximo dependerá de tu capacidad crediticia y los análisis de riesgo realizados.",
//								"meta", "Sección A - Préstamos")),
//				new Document("¿Cuáles son las tasas de interés aplicables?",
//						Map.of("answer", List.of(
//										"Las tasas de interés varían según el monto y la cuota seleccionada. A continuación te indicamos las tasas para cada opción de cuota:",
//										"- 6 meses: 18.45%",
//										"- 9 meses: 12.58%",
//										"- 12 meses: 9.65%",
//										"- 18 meses: 6.72%",
//										"- 24 meses: 5.26%",
//										"- 30 meses: 4.39%",
//										"- 36 meses: 3.82%",
//										"- 48 meses: 3.10%",
//										"- 60 meses: 2.69%",
//										"- 72 meses: 2.42%",
//										"- 84 meses: 2.23%",
//										"- 96 meses: 2.09%",
//										"- 120 meses: 1.92%",
//										"- 150 meses: 1.79%",
//										"- 180 meses: 1.72%",
//										"Estas tasas serán informadas de manera precisa al momento de completar tu solicitud."
//								),
//								"meta", "Sección A - Tasas de interés del préstamo")),
//				new Document("¿Qué plazos de pago están disponibles para los préstamos?",
//						Map.of("answer", "Los plazos de pago para los préstamos disponibles van desde 6 hasta 180 meses, con diferentes tasas de interés asociadas a cada plazo.",
//								"meta", "Sección A - Préstamos")),
//				new Document("¿Puedo adelantar el pago de mis cuotas?",
//						Map.of("answer", List.of(
//										"1. Puedes adelantar cuotas de tu préstamo entre el 1 y el 10 de cada mes.",
//										"2. El adelanto se calcula con un 5% de retribución sobre el saldo pendiente de tu préstamo.",
//										"3. Cada mes puedes adelantar cuotas siempre y cuando no estés atrasado con el pago.",
//										"4. El interés del 5% se aplica al saldo restante del préstamo, no sobre el monto total.",
//										"5. Si estás al día con tus pagos, puedes adelantar las cuotas en cualquier momento.",
//										"6. Recuerda que el adelanto de cuotas reduce el saldo pendiente y puede acelerar el proceso de liquidación de tu deuda."
//								),
//								"meta", "Sección A - Préstamos")),
//				new Document("¿Qué pasa si no puedo pagar una cuota a tiempo?",
//						Map.of("answer", List.of(
//										"Si no puedes pagar una cuota a tiempo, se aplicará una penalización por mora.",
//										"Desde el día 11 de retraso, se aplicará una tasa de interés del 0.002% diario, lo que equivale a un 6% mensual.",
//										"Este interés se sumará a la siguiente cuota y se cobrará junto con el monto pendiente.",
//										"Es importante regularizar tu deuda lo antes posible para evitar mayores cargos y que afecte tu historial crediticio."
//								),
//								"meta", "Sección A - Consecuencias por no pagar a tiempo"
//						)),
//				new Document("¿Cuánto tiempo tarda en aprobarse un préstamo?",
//						Map.of("answer", "Generalmente, el proceso de aprobación toma entre 24 y 72 horas después de completar la solicitud y enviar los documentos necesarios.",
//								"meta", "Sección A - Préstamos")),
//				new Document("¿Necesito tener un garante, garantes, para solicitar un préstamo?",
//						Map.of("answer", List.of(
//										"Para solicitar un préstamo, siempre se requieren dos garantes, independientemente de la capacidad del titular para pagar la cuota.",
//										"Tanto el titular como los garantes deben ser capaces de pagar la cuota mensual del préstamo.",
//										"Cada garante debe tener un sueldo mínimo de tres veces el monto de la cuota mensual. Por ejemplo, si la cuota es de $1000, el garante debe tener un sueldo mínimo de $3000.",
//										"Si no se cumplen estos requisitos, no será posible solicitar el préstamo."
//								),
//								"meta", "Sección A - Requisitos de garantes"
//						)),
//				new Document("¿Qué documentos debo presentar para validar mi identidad?",
//						Map.of("answer", "Documento de identidad oficial, comprobante de domicilio y, en algunos casos, comprobantes de ingresos o estado de cuenta bancario.",
//								"meta", "Sección A - Préstamos")),
//				new Document("¿Cómo sé si mi solicitud fue rechazada o aprobada?",
//						Map.of("answer", "Recibirás una notificación por correo electrónico o dentro de la plataforma con el estado de tu solicitud y las razones si fue rechazada.",
//								"meta", "Sección A - Préstamos")),
//
//				// Sección B: Sobre la Plataforma y Seguridad
//				new Document("¿Cómo se garantiza la seguridad de mis datos personales?",
//						Map.of("answer", "Utilizamos tecnología de encriptación de datos y cumplimos con normativas internacionales de protección de datos personales.",
//								"meta", "Sección B - Plataforma y Seguridad")),
//				new Document("¿Quién tiene acceso a mi información en la plataforma?",
//						Map.of("answer", "Solo el personal autorizado y los sistemas automatizados necesarios para procesar tu solicitud tienen acceso a tu información.",
//								"meta", "Sección B - Plataforma y Seguridad")),
//				new Document("¿Qué tan confiable es la API de validación de identidad utilizada?",
//						Map.of("answer", "La API utilizada cumple con altos estándares de seguridad y es auditada regularmente para garantizar su confiabilidad.",
//								"meta", "Sección B - Plataforma y Seguridad")),
//				new Document("¿Puedo modificar mis datos una vez ingresados?",
//						Map.of("answer", "Sí, puedes actualizar tu información personal desde tu perfil, siempre que no haya una solicitud pendiente de aprobación.",
//								"meta", "Sección B - Plataforma y Seguridad")),
//				new Document("¿Qué hago si olvidé mi contraseña?",
//						Map.of("answer", "Puedes restablecerla desde la opción “Olvidé mi contraseña” en la página de inicio de sesión. Recibirás un enlace en tu correo.",
//								"meta", "Sección B - Plataforma y Seguridad")),
//				new Document("¿Cómo recupero mi acceso si se bloquea mi cuenta?",
//						Map.of("answer", "Contacta al equipo de soporte desde el formulario en la plataforma para desbloquear tu cuenta.",
//								"meta", "Sección D - Soporte y Acceso")),
//				new Document("¿Puedo usar la plataforma desde cualquier país de Latinoamérica?",
//						Map.of("answer", "Actualmente está disponible en países específicos de la región. Verifica si tu país está en la lista al registrarte.",
//								"meta", "Sección D - Soporte y Acceso")),
//				new Document("¿En qué países de Latinoamérica puedo usar la plataforma?",
//						Map.of("answer", List.of(
//										"Actualmente, la plataforma está disponible en los siguientes países de Latinoamérica:",
//										"1. Argentina",
//										"2. México",
//										"3. Colombia",
//										"4. Chile",
//										"5. Perú",
//										"6. Ecuador",
//										"7. Uruguay",
//										"8. Paraguay",
//										"9. Bolivia",
//										"10. Costa Rica",
//										"Verifica si tu país está en la lista al registrarte, ya que la disponibilidad puede cambiar con el tiempo."
//								),
//								"meta", "Sección D - Soporte y Acceso")),
//				new Document("¿Qué medidas toman contra fraudes o identidades falsas?",
//						Map.of("answer", "Implementamos validación de documentos, análisis biométrico y monitoreo de actividad sospechosa en la plataforma.",
//								"meta", "Sección D - Soporte y Acceso")),
//
//				// Sección C: Sobre la Inversión
//				new Document("¿Cómo funciona el modelo de inversión en préstamos?",
//						Map.of("answer", "Los inversores financian préstamos aprobados y reciben intereses sobre el dinero prestado según los términos acordados.",
//								"meta", "Sección C - Inversión")),
//				new Document("¿Qué garantías tienen los inversores sobre los préstamos otorgados?",
//						Map.of("answer", "Los préstamos están respaldados por análisis de riesgo, y algunos pueden incluir garantías adicionales dependiendo del perfil del prestatario.",
//								"meta", "Sección C - Inversión")),
//				new Document("¿Cuáles son las métricas clave para evaluar las inversiones?",
//						Map.of("answer", "Indicadores como la tasa de interés, el historial crediticio del prestatario y el plazo del préstamo son esenciales.",
//								"meta", "Sección C - Inversión")),
//				new Document("¿Qué tipo de rendimiento puedo esperar?",
//						Map.of("answer", "Los rendimientos varían entre X% y Y% anual, dependiendo de los riesgos asociados a los préstamos seleccionados.",
//								"meta", "Sección C - Inversión")),
//				new Document("¿Cómo retiro las ganancias obtenidas de mi inversión?",
//						Map.of("answer", "Las ganancias se depositan en tu cuenta de usuario y puedes transferirlas a tu cuenta bancaria registrada.",
//								"meta", "Sección C - Inversión")),
//				new Document("¿Puedo diversificar mi inversión en distintos préstamos?",
//						Map.of("answer", "Sí, puedes asignar tu capital a múltiples préstamos para reducir el riesgo.",
//								"meta", "Sección C - Inversión")),
//				new Document("¿Qué información del prestatario será visible para mí como inversor?",
//						Map.of("answer", "Solo datos relevantes como el puntaje crediticio, monto solicitado y plazo, manteniendo la privacidad del prestatario.",
//								"meta", "Sección C - Inversión")),
//
//				// Sección D: Sobre el Proceso y Soporte
//				new Document("¿Cuánto tiempo tarda la verificación de identidad?",
//						Map.of("answer", List.of(
//										"La verificación de identidad se realiza en tiempo real mediante la API de Veriff.",
//										"Te notificaremos el estado de la verificación tan pronto como se complete."
//								),
//								"meta", "Sección D - Proceso y Soporte")),
//		new Document("¿Qué hago si el sistema rechaza mis documentos?",
//						Map.of("answer", "Revisa las instrucciones de carga y asegúrate de que los documentos sean claros y estén actualizados.",
//								"meta", "Sección D - Proceso y Soporte")),
//				new Document("¿Puedo cancelar mi solicitud de préstamo después de iniciarla?",
//						Map.of("answer", "Sí, mientras no haya sido aprobada. Una vez aprobada, se aplican las condiciones del contrato.",
//								"meta", "Sección D - Proceso y Soporte")),
//				new Document("¿Cómo contacto al soporte técnico si tengo problemas?",
//						Map.of("answer", "Desde la sección de Ayuda o mediante correo electrónico. Responderemos en un plazo de 24-48 horas.",
//								"meta", "Sección D - Proceso y Soporte")),
//				new Document("¿Qué hago si detecto una transacción no autorizada en mi cuenta?",
//						Map.of("answer", "Notifica inmediatamente al soporte técnico para bloquear tu cuenta y realizar las investigaciones necesarias.",
//								"meta", "Sección D - Proceso y Soporte")),
//
//				// Sección E: Sobre Condiciones y Políticas
//				new Document("¿Cuáles son las políticas de privacidad de la plataforma?",
//						Map.of("answer", "Puedes consultarlas en el apartado 'Política de Privacidad' del sitio web.",
//								"meta", "Sección E - Condiciones y Políticas")),
//				new Document("¿Qué pasa si entro en mora por más de tres meses?",
//						Map.of("answer", List.of(
//										"Si no puedes pagar la deuda en más de tres meses, tu saldo podrá ser refinanciado bajo nuevas condiciones.",
//										"Si no se llega a un acuerdo de refinanciación, la deuda será enviada a una agencia de cobranzas y podría afectar tu historial crediticio.",
//										"Te recomendamos contactarnos para explorar opciones de refinanciamiento antes de que tu deuda sea derivada a cobranzas."
//								),
//								"meta", "Sección E - Condiciones y Políticas")),
//				new Document("¿La plataforma cobra algún costo adicional o comisiones?",
//						Map.of("answer", "Sí, se aplican comisiones por apertura de préstamos o gestión de inversiones, que son informadas previamente.",
//								"meta", "Sección E - Condiciones y Políticas")),
//				new Document("¿Qué sucede si quiero cerrar mi cuenta?",
//						Map.of("answer", "Puedes solicitarlo desde el menú de configuración, siempre que no tengas deudas activas.",
//								"meta", "Sección E - Condiciones y Políticas")),
//				new Document("¿Es posible refinanciar un préstamo?",
//						Map.of("answer", "Sí, dependiendo de tu historial de pagos y perfil crediticio.",
//								"meta", "Sección E - Condiciones y Políticas")),
//				new Document("¿Qué tipo de contrato firmo al aceptar un préstamo o inversión?",
//						Map.of("answer", List.of(
//										"Al aceptar un préstamo o inversión, tanto el cliente como la financiera firman un contrato digital vinculante.",
//										"El contrato detalla las condiciones específicas, incluyendo montos, plazos, tasas de interés, y términos de pago o inversión.",
//										"Este contrato es una confirmación de que ambas partes están de acuerdo con las condiciones establecidas y es necesario para formalizar el acuerdo.",
//										"Además, el contrato incluye cláusulas de protección para ambas partes, especificando los derechos y obligaciones de cada una, así como las consecuencias en caso de incumplimiento."
//								),
//								"meta", "Sección E - Condiciones y Políticas")),
//
//				// Sección F: Generalidades
//				new Document("¿La plataforma tiene una aplicación móvil?",
//						Map.of("answer", "Sí, está disponible para dispositivos Android e iOS.",
//								"meta", "Sección F - Generalidades")),
//				new Document("¿Cómo me notifican sobre los pagos de mis cuotas?",
//						Map.of("answer", "A través de notificaciones en la app, correos electrónicos y recordatorios en tu perfil.",
//								"meta", "Sección F - Generalidades")),
//				new Document("¿Qué hago si tengo dudas durante la solicitud?",
//						Map.of("answer", "Consulta las guías en la sección de Ayuda o contacta al soporte técnico.",
//								"meta", "Sección F - Generalidades")),
//				new Document("¿Qué sucede si quiero aumentar el monto de mi préstamo una vez aprobado?",
//						Map.of("answer", "Deberás iniciar una nueva solicitud para evaluar tu capacidad de crédito.",
//								"meta", "Sección F - Generalidades")),
//				new Document("¿Puedo recomendar la plataforma a otras personas y recibir algún beneficio?",
//						Map.of("answer", List.of(
//										"Sí, estamos trabajando en el lanzamiento de un programa de referidos que otorgará beneficios a quienes inviten usuarios exitosos.",
//										"Pronto podrás recomendar la plataforma a otras personas y recibir recompensas por sus registros y actividades dentro de la plataforma.",
//										"Te informaremos sobre los detalles del programa cuando esté disponible."
//								),
//								"meta", "Sección F - Generalidades")),
//				new Document("¿Es necesario un correo electrónico para registrarme?",
//						Map.of("answer", "Sí, es un requisito obligatorio para validar tu cuenta.",
//								"meta", "Sección F - Generalidades")),
//				new Document("¿Puedo acceder a la plataforma en otros idiomas?",
//						Map.of("answer", "Actualmente está disponible en español y próximamente en inglés y portugués.",
//								"meta", "Sección F - Generalidades")),
//				new Document("¿Qué pasa si no tengo un historial crediticio?",
//						Map.of("answer", "Podrás iniciar con préstamos pequeños que ayuden a construir tu historial.",
//								"meta", "Sección F - Generalidades")),
//				new Document("¿Cómo se maneja la relación entre inversores y prestatarios?",
//						Map.of("answer", "Es gestionada por la plataforma, asegurando la privacidad y cumplimiento de los términos.",
//								"meta", "Sección F - Generalidades")),
//				// Sección G: Casos Específicos
//				new Document("¿Puedo solicitar más de un préstamo al mismo tiempo?",
//						Map.of("answer", "Depende de tu historial de pagos y análisis de capacidad de endeudamiento.",
//								"meta", "Sección G - Casos Específicos")),
//				new Document("¿Qué hago si el monto solicitado no cubre mis necesidades?",
//						Map.of("answer", List.of(
//										"Si el monto solicitado no cubre tus necesidades, puedes solicitar una revisión para ajustar el monto o iniciar una nueva solicitud con una cantidad mayor.",
//										"Nuestro equipo está aquí para ayudarte a encontrar la mejor opción que se ajuste a tus necesidades. En algunos casos, un administrador evaluará la posibilidad de aprobar una solicitud mayor."
//								),
//								"meta", "Sección G - Casos Específicos")),
//				new Document("¿Cómo me aseguro de que mi inversión tenga bajos riesgos?",
//						Map.of("answer", "Analiza el puntaje crediticio del prestatario y diversifica tus inversiones.",
//								"meta", "Sección G - Casos Específicos")),
//				new Document("¿Qué sucede si quiero cambiar a mi garante después de enviar los datos?",
//						Map.of("answer", "Deberás presentar los datos del nuevo garante para una reevaluación del préstamo.",
//								"meta", "Sección G - Casos Específicos")),
//				new Document("¿Cómo se gestiona la conversión de divisas si el préstamo es internacional?",
//						Map.of("answer", "La plataforma realiza la conversión automática según el tipo de cambio actual.",
//								"meta", "Sección G - Casos Específicos")),
//				// Sección H: Preguntas ambiguas o incoherentes
//				new Document("¿Por qué el cielo es azul?",
//						Map.of("answer", "Esta plataforma está diseñada para resolver dudas relacionadas con préstamos e inversiones. Reformula tu pregunta para que podamos ayudarte de manera más precisa.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//				new Document("asdfghjkl?",
//						Map.of("answer", "No podemos identificar tu consulta. Por favor, verifica la pregunta y vuelve a intentarlo.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("123456789?",
//						Map.of("answer", "Parece que ingresaste caracteres sin contexto. Reformula tu consulta para poder asistirte de forma adecuada.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("Lorem ipsum dolor sit amet?",
//						Map.of("answer", "El texto ingresado parece un ejemplo genérico. Por favor, formula una consulta relacionada con préstamos o inversiones.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("🤔🤔🤔?",
//						Map.of("answer", "No entendemos tu consulta. Por favor, sé más claro para que podamos ofrecerte la asistencia necesaria.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				// Preguntas filosóficas o absurdas
//				new Document("¿Qué fue primero, el huevo o la gallina?",
//						Map.of("answer", "Nuestra plataforma no aborda preguntas filosóficas. Por favor, plantea una consulta específica sobre nuestros servicios financieros.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("¿Puedes prestarme felicidad?",
//						Map.of("answer", "Estamos aquí para ayudarte con préstamos financieros. Reformula tu pregunta para que podamos brindarte una respuesta adecuada.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("¿Cómo puedo volar?",
//						Map.of("answer", "Entendemos que puedas tener dudas, pero nuestras respuestas están limitadas a préstamos e inversiones. Reformula tu consulta para que podamos asistirte.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("¿Dónde está el unicornio?",
//						Map.of("answer", "No podemos ayudarte a encontrar un unicornio, pero sí a resolver tus dudas sobre préstamos e inversiones. Reformula tu consulta.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("¿Qué hago si quiero hablar con aliens?",
//						Map.of("answer", "Nuestra plataforma no tiene información sobre aliens. Si tienes dudas sobre préstamos o inversiones, estamos para ayudarte.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				// Insultos o lenguaje inapropiado
//				new Document("Esto es una estafa.",
//						Map.of("answer", "Entendemos tus preocupaciones. Te aseguramos que cumplimos con todas las normativas legales y garantizamos transparencia en todos nuestros procesos. Si tienes dudas, contáctanos para resolverlas.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("¡Son unos ladrones!",
//						Map.of("answer", "Lamentamos que tengas esa impresión. Por favor, contáctanos para aclarar cualquier malentendido o problema que hayas experimentado.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("Esto es una basura.",
//						Map.of("answer", "Apreciamos tus comentarios y nos gustaría mejorar tu experiencia. Por favor, detalla tus inquietudes para que podamos ayudarte de manera efectiva.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("Son inútiles.",
//						Map.of("answer", "Lamentamos que te sientas así. Estamos aquí para ayudarte y resolver cualquier inconveniente con nuestros servicios.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				// Lenguaje ofensivo
//				new Document("¡%&@*!",
//						Map.of("answer", "Tu mensaje contiene lenguaje ofensivo. Por favor, mantén un tono respetuoso para que podamos asistirte adecuadamente.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("Esto es una mierda.",
//						Map.of("answer", "Entendemos tu frustración y estamos aquí para ayudarte. Reformula tu consulta para que podamos asistirte de forma efectiva.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("¡Malditos sean!",
//						Map.of("answer", "Lamentamos que te sientas así. Estamos comprometidos en ofrecerte el mejor servicio posible. Si tienes un problema específico, contáctanos.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				// Casos ambiguos o irrelevantes
//				new Document("¿Cómo está el clima hoy?",
//						Map.of("answer", "Nuestra plataforma no ofrece información meteorológica. Por favor, plantea una consulta relacionada con préstamos o inversiones.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("¿Me puedes dar un número de lotería?",
//						Map.of("answer", "No proporcionamos números de lotería, pero sí asistencia con préstamos e inversiones. Reformula tu pregunta para recibir ayuda.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//
//				new Document("¿Qué opinas del fútbol?",
//						Map.of("answer", "Aunque el fútbol es un tema interesante, nuestras respuestas están orientadas a servicios financieros. Por favor, plantea una consulta relevante.",
//								"meta", "Sección H - Casos de preguntas sin sentido")),
//				new Document("¿Cómo iniciar una solicitud de préstamo?",
//						Map.of("answer", List.of(
//										"Ingresa el monto a solicitar.",
//										"Elige una opción de cuota con su tasa de interés.",
//										"Asegúrate de que tu sueldo sea al menos 3 veces el monto de la cuota.",
//										"Si estás conforme con las condiciones, confirma la solicitud.",
//										"Completa los datos necesarios y espera la notificación de la aprobación."
//								),
//								"meta", "Sección H - Cómo iniciar una solicitud de préstamo")),
//				// Sección I: Preguntas vacías o nulas
//				new Document("¿Campo vacío o nulo?",
//						Map.of("answer", "Debes ingresar una pregunta para que podamos ayudarte. Por favor, reformula tu pregunta.",
//								"meta", "Sección I de Pregunta Vacía o Nula")),
//				// Sección K: Verificación de identidad para préstamos
//				new Document("¿Cómo verificar mi identidad para solicitar un préstamo?",
//						Map.of("answer", List.of(
//										"Para garantizar la seguridad y veracidad de tu solicitud, realizamos un proceso de verificación biométrica de identidad.",
//										"Durante el proceso, se te pedirá que ingreses tus datos reales y subas un documento de identidad oficial, como tu DNI o pasaporte.",
//										"Además, deberás completar un reconocimiento facial para asegurar que la persona que solicita el préstamo es quien dice ser.",
//										"Es fundamental que los datos proporcionados sean consistentes con los documentos subidos, ya que cualquier incongruencia será detectada y podría bloquear el proceso.",
//										"Si los datos ingresados no coinciden con los de tus documentos oficiales, el sistema bloqueará la solicitud.",
//										"Una vez verificada tu identidad, podrás continuar con el proceso de solicitud del préstamo.",
//										"Si tienes problemas durante la verificación, asegúrate de que tus documentos sean legibles y que tu rostro sea claramente visible en la cámara."
//								),
//								"meta", "Sección K - Verificación de identidad")),
//				new Document(
//						"Saludo inicial",
//						Map.of(
//								"question", List.of(
//										"Hola",
//										"Buenas",
//										"Qué tal",
//										"Saludos",
//										"Buen día",
//										"Buenas tardes",
//										"Buenas noches",
//										"Hey",
//										"Hola, ¿cómo estás?",
//										"Qué onda",
//										"Qué hay",
//										"Hola, ¿me puedes ayudar?",
//										"Un saludo",
//										"Buen día, ¿puedes ayudarme?",
//										"Hola, necesito ayuda",
//										"Buenas, ¿estás ahí?",
//										"Hola, ¿puedes responderme?",
//										"Hola, ¿puedo hacerte una consulta?",
//										"Hola, tengo una duda",
//										"¿Qué tal? Necesito orientación",
//										"Hola, ¿me podrías guiar?",
//										"Buen día, quiero información",
//										"Buenas noches, tengo preguntas"),
//								"answer", List.of(
//										"¡Hola! Estoy aquí para ayudarte y guiarte en lo que necesites. Por favor, dime qué deseas saber o en qué puedo asistirte."),
//								"meta", "Respuesta genérica para saludos"))
//		);
//		vectorStore.add(documents);
	}
}
