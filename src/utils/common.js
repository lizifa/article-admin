export function debounce(fn, delay) {
  console.log(fn, delay)
  let timer = null
  return function() {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(fn, delay)
    } else {
      timer = setTimeout(fn, delay)
    }
  }
}
