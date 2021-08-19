import axios from 'axios'

const handleAuthorize = async () => {
  const popup = openPopup()
  try {
    const { data } = await axios.get<{
      oauth_token: string
    }>('/api/twitter/oauth_token')
    popup.location.replace(`https://api.twitter.com/oauth/authorize?oauth_token=${data.oauth_token}`)
    polling(popup)
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

const openPopup = () => {
  const w = 600
  const h = 600
  const left = screen.width / 2 - w / 2
  const top = screen.height / 2 - h / 2

  return window.open(
    '',
    '',
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  )
}

const polling = (popup) => {
  const polling = setInterval(async () => {
    if (!popup || popup.closed || popup.closed === undefined) {
      clearInterval(polling)
      console.error(new Error('Popup has been closed by user'))
    }

    const closeDialog = () => {
      clearInterval(polling)
      popup.close()
    }
    try {
      if (!popup.location.hostname.includes('api.twitter.com')) {
        if (popup.location.search) {
          closeDialog()
          // const { data } = await axios.post<{
          //   access_token: string
          //   access_token_secret: string
          // }>('/api/twitter/token', { data: popup.location.search })
          // !!onSuccess && onSuccess({ social_channel: 'twitter', ...data })
        }
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }, 500)
}

export { handleAuthorize }
