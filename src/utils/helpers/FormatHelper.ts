const kFormatter = (inputNum: number): number | string => {
  /*
    Reference:
    400 -> 400
    4,000 -> 4k
    40,000 -> 40k
    400,000 -> 400k
    4,000,000 -> 4m
  */
  const numAbs = Math.abs(inputNum)
  const toFixedNum = 1
  let result: string | number

  if (numAbs > 999999) {
    const million = 1000000
    result = Math.sign(inputNum) * parseInt((numAbs / million).toFixed(toFixedNum)) + 'm'
  } else if (numAbs > 999) {
    const thousand = 1000

    result = Math.sign(inputNum) * parseInt((numAbs / thousand).toFixed(toFixedNum)) + 'k'
  } else {
    result = Math.sign(inputNum) * Math.abs(inputNum)
  }

  return result
}

const japaneseWanFormatter = (inputNumber: number): number | string => {
  /*
      Reference:
      400 -> 400
      4000 -> 4000
      40000 -> 4万
      400000 -> 40万
      43000 -> 4.3万
      421513000 -> 42151.3万
    */
  if (inputNumber < 10000) return inputNumber
  const wanValue = inputNumber / 10000
  return `${Math.round(wanValue * 10) / 10}万`
}

const currencyFormat = (nStr: string): string => {
  nStr += ''
  const x = nStr.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? '.' + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  return x1 + x2
}

const dateArray = (date: string) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate()
  const hours = '' + d.getHours(),
    minutes = '' + d.getMinutes(),
    year = d.getFullYear()
  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  return [year, month, day, hours, minutes]
}

const dateFormatShort = (date: string): string => {
  const [year, month, day] = dateArray(date)
  return [year, month, day].join('/')
}
const dateFormat = (date: string): string => {
  const [year, month, day, hours, minutes] = dateArray(date)
  return [year, month, day].join('/') + '  ' + hours + ':' + minutes
}

const spacedLinks = function (content: string): string {
  if (content !== null && typeof content !== 'undefined' && content.includes('http')) {
    const expr = /.?(?=http)/gim
    const reMakedContent = content.replace(expr, function (x) {
      if (x !== ' ' && x !== '') {
        return x + ' '
      }
      return x
    })
    return reMakedContent
  }
  return content
}

const textSizeMode = (str: string, limit?: number): string => {
  const text = str.length <= limit ? str : `${str.slice(0, limit)}...`
  return text
}

export const FormatHelper = {
  kFormatter,
  dateFormatShort,
  dateFormat,
  spacedLinks,
  currencyFormat,
  textSizeMode,
  japaneseWanFormatter,
}
