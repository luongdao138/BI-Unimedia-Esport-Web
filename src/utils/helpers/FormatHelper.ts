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

export const FormatHelper = {
  kFormatter,
  dateFormatShort,
  dateFormat,
  spacedLinks,
}
