/**
 * Storage
 */

/* Author: Frederik Søgren Blunck Raisa */
/* Author: Jonas Glerup Røssum */

export default {
  setState,
  getState,
  subscribe
}

const subscribers = []

/**
 * API
 */
function setState(newState) {
  if (typeof newState === 'function') {
    const oldState = getState()
    appstate = newState(oldState)
  } else {
    appstate = newState
  }
  for (let subscriber of subscribers) {
    subscriber(appstate)
  }
}

function getState() {
  return { ...appstate }
}

function subscribe(callback) {
  const index = subscribers.length
  subscribers.push(callback)
  return () => subscribers.filter((_, i) => i !== index)
}

let appstate = {}