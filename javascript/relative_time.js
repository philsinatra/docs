// https://twitter.com/wesbos/status/1587445824027598848

const time = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto'
})

time.format(1, 'days') // tomorrow
time.format(-1, 'days') // yesterday

time.format(0, 'month') // this month
time.format(10, 'month') // in 10 months

time.format(-1, 'seconds') // 1 second ago
