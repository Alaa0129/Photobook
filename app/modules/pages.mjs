/**
 * Pages
 * Author: Frederik Raisa
 */

/* Init */
let storageRef;

export default (storage) => ({
  init() {
    storageRef = storage;
    storage.setState(defaultState);
  },
  addPage,
  getPage,
  getPageCount,
  setPage,
  delPage,
  getCurrentPageIndex,
  setCurrentPageIndex,
});

/**
 * API
 */
function addPage(page) {
  let state = storageRef.getState();

  state.pages.push(page);
  storageRef.setState(state);
}

function setPage(pageNumber, pageContent) {
  let state = storageRef.getState();

  state.pages[pageNumber] = pageContent;
  storageRef.setState(state);
}

function delPage(pageNumber = null) {
  let state = storageRef.getState();

  if (pageNumber === null) {
    state.pages.pop();
  } else {
    state.pages.splice(pageNumber);
  }

  storageRef.setState(state);
}

function getPage(pageNumber = null) {
  let state = storageRef.getState();

  console.log(state);

  if (pageNumber !== null) {
    console.log("get page");
    console.log(state.pages[pageNumber]);
    return state.pages[pageNumber];
  }
  return state.pages;
}

function getPageCount() {
  return storageRef.getState().pages.length;
}

function getCurrentPageIndex() {
  return storageRef.getState().currentPageIndex;
}

function setCurrentPageIndex(index) {
  storageRef.setState((stateDraft) => {
    stateDraft.currentPageIndex = index;
    return stateDraft;
  });
}

/* default value */
const defaultState = {
  title: "Fotobog",
  currentPageIndex: 0,
  selectedTheme: null,
  pages: [
    {
      layout: "layout-one",
      type: "image",
      image_url: null,
      content: {
        title: {
          text: "Titel",
          styles: {},
          extras: {},
        },
        caption: {
          text: "Caption",
          styles: {},
          extras: {},
        },
      },
    },
    {
      layout: "layout-one",
      type: "image",
      image_url: null,
      content: {
        title: {
          text: "Titel to",
          styles: {},
          extras: {},
        },
        caption: {
          text: "Caption",
          styles: {},
          extras: {},
        },
      },
    },
    {
      layout: "layout-two",
      type: "image",
      image_url: null,
      content: {
        title: {
          text: "Titel 2",
          styles: {},
          extras: {},
        },
        caption: {
          text: "Caption",
          styles: {},
          extras: {},
        },
      },
    },
  ],
};

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
};
