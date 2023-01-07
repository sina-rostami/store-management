const from = '۱۲۳۴۵۶۷۸۹۰.-'
const to = '1234567890.-'

const dftl = (number) => {
  if (typeof number === 'undefined') return ''

  return String(number)
    .split('')
    .map(char => to[from.indexOf(char)] || char)
    .join('')
}

export default dftl
