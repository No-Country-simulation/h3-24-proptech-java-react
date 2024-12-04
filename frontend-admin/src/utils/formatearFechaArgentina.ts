export function formatearFechaArgentina(fecha: string) {
  const date = new Date(fecha);

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const fechaFormateada = new Intl.DateTimeFormat('es-AR', opciones).format(
    date
  );

  return fechaFormateada;
}
