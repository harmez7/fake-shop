const formatCurrency = currency => {
    const formatter = new Intl.NumberFormat(
        'en-US',
        {currency: 'USD', style: 'currency'}
      )
      return formatter.format(currency)
}

export default formatCurrency