// Used to convert a number into an array of digits

const computeDigits = (speed: number, ignoreLeadingZeroes: boolean = false) => {
  const digit1 = Math.floor((speed / 100) % 10)
  const digit2 = Math.floor((speed / 10) % 10)
  const digit3 = Math.floor(speed % 10)

  if (ignoreLeadingZeroes) {
    return [
      digit1 === 0 ? 10 : digit1,
      (digit1 === 0 && digit2 === 0) ? 10 : digit2,
      digit3
    ]
  } else {
    return [digit1, digit2, digit3]
  }
}

export default computeDigits