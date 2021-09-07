export const kFormatter = (inputNum: number) => {
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
  let result

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

export const weekDay = (time) => {
  if (!time) return ''

  const weekdays = new Array(7)
  weekdays[0] = '日'
  weekdays[1] = '月'
  weekdays[2] = '火'
  weekdays[3] = '水'
  weekdays[4] = '木'
  weekdays[5] = '金'
  weekdays[6] = '土'

  const day = new Date(time)
  return weekdays[day.getDay()]
}
