export const getFirstNonZeroDigits = (n: number, precision = 3) => {
  return n.toFixed(precision - 1 - Math.floor(Math.log(n) / Math.log(10)))
}
