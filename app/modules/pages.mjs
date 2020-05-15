/**
 * Pages
 * Author: Frederik Raisa
 */

/* Init */
let storageRef

export default function init(storage) {
  storageRef = storage
  storage.setState(defaultState)

  return {
    addPage,
    getPage,
    setPage,
    delPage,
  }
}

/**
 * API
 */
function addPage(page) {
  let state = storageRef.getState()

  state.pages.push(page)

  storageRef.setState(state)
}

function setPage(pageNumber, pageContent) {
  let state = storageRef.getState()

  state.pages[pageNumber] = pageContent

  storageRef.setState(state)
}

function delPage(pageNumber = null) {
  let state = storageRef.getState()

  if (pageNumber) {
    state.pages.splice(pageNumber)
  } else {
    state.pages.pop()
  }

  storageRef.setState(state)
}

function getPage(pageNumber = null) {
  let state = storageRef.getState()

  if (pageNumber) {
    return state.pages[pageNumber]
  }
  return state.pages
}


/* default value */
const defaultState = {
  title: "Fotobog",
  pages: [
    {
      layout: "layout-one",
      type: "image",
      image_url: "url",
      content: [
        {
          type: "title",
          text: "Min titel",
          styles: {},
          extras: {},
        },
        {
          type: "caption",
          text: "min caption",
          styles: {},
          extras: {},
        }
      ]
    },
    {
      layout: "layout-two",
      type: "separator",
      content: [
        {
          type: "title",
          text: "Min titel",
          styles: {},
          extras: {},
        },
        {
          type: "caption",
          text: "min caption",
          styles: {},
          extras: {},
        }
      ]
    }
  ]
}

const oldState = {
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