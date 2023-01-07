const dltf = (n) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return n.toString()
    .split('')
    .map(x => {
      if (x === ',') {
        return '٫'
      } else if (x === '-') {
        return '-'
      }
      return farsiDigits[x]
    })
    .join('')

}

export default dltf