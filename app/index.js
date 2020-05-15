import theme from './modules/theme.mjs'
import storage from './modules/storage.mjs'
import Pages from './modules/pages.mjs'
import Layout from './modules/layout.mjs'

theme.init();

/** WIP */
const pages = Pages(storage)

// Create default layout
const main = document.querySelector('.main')

const layout = Layout()

main.appendChild(

  layout.createElement('#layout-one', {
    title: 'Title',
    author: 'Raisa'
  })

)

// Event Delegator
main.addEventListener('change', e => {
  if (e.target && e.target.matches('.file-plane')) fileUpload(e)
})

function fileUpload(ev) {
  let image = ev.target.parentElement.querySelector('.img')

  let reader = new FileReader()

  reader.onload = () => {
    image.src = reader.result
  }

  reader.readAsDataURL(ev.target.files[0])
}

// Paging
const prevPageBtn = document.querySelector('.prev')
const nextPageBtn = document.querySelector('.next')

let currentPage = 0

prevPageBtn.addEventListener('click', e => {
  currentPage--

  pages.getPage(currentPage)
})

nextPageBtn.addEventListener('click', e => {
  currentPage++

  pages.getPage(currentPage)
})

