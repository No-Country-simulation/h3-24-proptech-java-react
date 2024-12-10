// Función para formatear números
export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export function formatToARSCurrency(amount) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const day = date.getDate();
  const month = date.toLocaleString("es-ES", { month: "short" }); // Mes abreviado
  const year = date.getFullYear();

  // Only include year if current year is not the same as target date
  const includeYear = year !== now.getFullYear();
  return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}. ${
    includeYear ? `${year}` : ""
  }`;
}
