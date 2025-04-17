export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
  };
  return new Date(dateString).toLocaleDateString("es-MX", options);
};

export const formatCurrency = (dateString: number) => {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "USD",
  };
  return new Intl.NumberFormat("es-MX", options).format(dateString);
};
