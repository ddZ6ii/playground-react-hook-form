export function wait(delayInMs = 1000) {
  return new Promise((resolve) => setTimeout(resolve, delayInMs))
}
