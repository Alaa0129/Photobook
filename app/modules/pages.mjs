/**
 * Pages
 */

/* Author: Frederik Søgren Blunck Raisa */
/* Author: Jonas Glerup Røssum */
 
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
  getSelectedPageIndex,
  setSelectedPageIndex,
});

/**
 * API
 */

const createDefaultPage = () => ({
  layout: "layout-one",
  type: "image",
  image_url: null,
  content: {
    title: {
      text: "Klik for at tilføje tekst",
      styles: {},
      extras: {},
    },
    caption: {
      text: "Caption",
      styles: {},
      extras: {},
    },
  },
})

function addPage(page = createDefaultPage()) {
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
  
  if (pageNumber !== null) {
    return state.pages[pageNumber];
  }
  return state.pages;
}

function getPageCount() {
  return storageRef.getState().pages.length;
}

function getSelectedPageIndex() {
  return storageRef.getState().selectedPageIndex;
}

function setSelectedPageIndex(index) {
  storageRef.setState((stateDraft) => {
    stateDraft.selectedPageIndex = index;
    return stateDraft;
  });
}



/* default value */
const defaultState = {
  title: "Fotobog",
  selectedPageIndex: null,
  selectedTheme: null,
  pages: [
    createDefaultPage()
  ],
};
