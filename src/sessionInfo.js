export const sessionInfo = () => {
  const session = JSON.parse(window.sessionStorage.getItem('token'))

  const { name, token } = session

  return { name, token }
}
