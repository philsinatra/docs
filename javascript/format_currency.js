const { format } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

format(200.21)
