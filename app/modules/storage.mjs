/**
 * Storage
 * Author: Frederik Søgren Blunck Raisa
 */
export default {
  setState,
  getState
}

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
}

function getState() {
  return appstate
}

let appstate = {}