/**
 * Storage
 * Author: Frederik Søgren Blunck Raisa
 */
export default {
  storage: window.localStorage,

  addPage,
  setPage,
  getPage,
  getPages,

  setState,
  getState
}


/**
 * API
 */
function addPage(page) {
  let state = getState()

  state.pages.push(page)

  setState(state)
}

function setPage(pageNumber, pageContent) {
  let state = getState()

  state.pages[pageNumber] = pageContent

  setState(state)
}

function delPage(pageNumber = null) {
  let state = getState()

  if (pageNumber) {
    state.pages.splice(pageNumber)
  } else {
    state.pages.pop()
  }

  setState(state)
}

function getPage() {
  throw Error('Placeholder')
}

function getPages(pageNumber = null) {
  let state = getState()

  if (pageNumber) {
    return state.pages[pageNumber]
  }
  return state.pages
}

/**
 * Helper functions
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

/**
 * Storage keeping
 */
let appstate = {
  title: "Min fotobog",
  pages: [
    {
      image_url: "imgur URL",
      content: [
        {
          type: "title",
          text: "Min titel",
          styles: {},
          extras: {},
        },
      ],
    },
    {
      image_url: "imgur URL",
      content: [
        {
          type: "title",
          text: "Min titel",
          styles: {},
          extras: {},
        },
        {
          type: "caption",
          text: "Min billedtekst",
          styles: {
            color: "red",
            fontSize: "18px",
          },
          extras: {},
        },
      ],
    },
  ],
}