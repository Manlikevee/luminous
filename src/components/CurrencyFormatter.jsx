import React from 'react';

const formatCurrency = (amount) => {
  // Convert the amount to a string
  const amountString = amount.toString();
  
  // Split the amount into whole and decimal parts (in case there are decimals)
  const [wholePart] = amountString.split('.');

  // Use a regular expression to add commas as thousand separators
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return the formatted string with the currency symbol
  return `₦${formattedWholePart}`;
};

const CurrencyFormatter = ({ amount }) => {
    // Ensure amount is a number and default to 0 if it's not provided or invalid
    const validAmount = isNaN(amount) ? 0 : amount;
    return <span>{formatCurrency(validAmount)}</span>;
  };

export default CurrencyFormatter;
