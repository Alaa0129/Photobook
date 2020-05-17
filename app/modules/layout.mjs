/* Author: Frederik Søgren Blunck Raisa */
/* Author: Jonas Glerup Røssum */

export default function init() {
  return {
    createElement
  }
}

function createElement(layout, content) {
  const fragment = document.getElementById(layout)
  const instance = document.importNode(fragment.content, true)

  for (const [key, val] of Object.entries(content)) {
    const [selector, property = null] = key.split('|')
    const elem = instance.querySelector(selector)
    if (property) elem[property] = val
    else elem.innerHTML = val
  }

  return instance
}
