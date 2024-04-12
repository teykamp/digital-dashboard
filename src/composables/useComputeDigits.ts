const computeDigits = (speed: number) => [
  (Math.floor((speed / 100) % 10)) || 0,
  (Math.floor((speed / 10) % 10)) || 0,
  (Math.floor((speed) % 10)) || 0,
]

export default computeDigits