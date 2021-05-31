export const monthByNumber = {
  0: '1',
  1: '2',
  2: '3',
  3: '4',
  4: '5',
  5: '6',
  6: '7',
  7: '8',
  8: '9',
  9: '10',
  10: '11',
  11: '12',
}

export const numberByMonth = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  11: 10,
  12: 11,
}

export const daysInMonth = {
  0: 31,
  1: 31,
  2: 31,
  3: 31,
  4: 31,
  5: 31,
  6: 31,
  7: 31,
  8: 31,
  9: 31,
  10: 31,
  11: 31,
}

export const unit = {
  day: 'day',
  month: 'month',
  year: 'year',
}

export const formatDate = (date) => {
  // formats a JS date to 'yyyy-mm-dd'
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
