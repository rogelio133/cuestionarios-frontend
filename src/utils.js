export const handleOnEnter = (e, method) => {
  if (e.key === 'Enter') {
    method()
  }
}
export const fetchData = (urlAPI, parameters) => new Promise((resolve, reject) => {
  const xhttp = new XMLHttpRequest()
  xhttp.open('POST', urlAPI, true)
  xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4) {
      xhttp.status === 200
        ? resolve(JSON.parse(xhttp.responseText))
        : reject(new Error(`error ${urlAPI}`))
    }
  }
  xhttp.send(JSON.stringify(parameters))
})

export const rulesEmpty = (value) => {
  const re = /^\s*$/
  return re.test(String(value).toLowerCase())
}

export const rulesEmail = (value) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(value).toLowerCase())
}
