export const hhmmss = (duration: number) => {
  if (duration < 0) return '00:00:00'
  const _duration = Math.round(duration)
  const hrs = ~~(_duration / 3600)
  const mins = ~~((_duration % 3600) / 60)
  const secs = ~~_duration % 60

  // Output "01:01" or "04:03:59" or "123:03:59"
  let ret = ''
  ret += (hrs < 10 ? '0' : '') + +hrs + ':'
  ret += (mins < 10 ? '0' : '') + mins + ':'
  ret += (secs < 10 ? '0' : '') + secs
  return ret
}
