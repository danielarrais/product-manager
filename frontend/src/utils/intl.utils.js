const currencyUSD = (number) => {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(number);
}

const dateTimeBRL = (date) => {
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: 'America/Sao_Paulo'
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
}

export {currencyUSD, dateTimeBRL};