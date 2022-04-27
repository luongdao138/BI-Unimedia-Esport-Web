import PageWithLayoutType from '@constants/page'
import { Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

const PaymentResult: PageWithLayoutType = () => {
  const router = useRouter()
  const formRef = useRef(null)
  const [url, setUrl] = useState('')
  const [accessID, setAccessID] = useState('')
  const [token, setToken] = useState('')

  const getParamFromURL = (queryKey, setState) => {
    const s = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
    if (typeof s === 'string') {
      setState(decodeURIComponent(s) || '')
    }
    return s
  }

  useEffect(() => {
    if (!url) getParamFromURL('url', setUrl)
    if (!accessID) getParamFromURL('AccessID', setAccessID)
    if (!token) getParamFromURL('Token', setToken)
  }, [router])

  useEffect(() => {
    if (url && accessID && token) {
      formRef.current.submit()
    }
  }, [url, accessID, token])

  return (
    <Box>
      <form ref={formRef} id="TheForm" method="POST" action={url}>
        <input type="hidden" name="Token" value={token} />
        <input type="hidden" name="AccessID" value={accessID} />
      </form>
    </Box>
  )
}

export default PaymentResult
