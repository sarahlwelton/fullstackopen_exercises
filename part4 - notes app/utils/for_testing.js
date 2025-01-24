const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

// We can fix our function to support dividing by 0, so we don't get NaN
const average = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

module.exports = {
  reverse,
  average,
}