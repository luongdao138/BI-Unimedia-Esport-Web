import React, { createContext, useEffect, useContext, useState } from 'react'
// import { isMobile } from 'react-device-detect'
import useLiveStreamDetail from '../useLiveStreamDetail'

const LIMIT_ITEM = 12

const RelatedVideoContext = createContext<any>({})

interface Props {
  children: React.ReactNode
  video_id: string | string[]
}

const RelatedVideoContextProvider: React.FC<Props> = ({ children, video_id }) => {
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = LIMIT_ITEM

  const { meta_related_video_stream, relatedVideoStreamData, getRelatedVideoStream, resetRelatedVideoStream } = useLiveStreamDetail()
  const isLoading = meta_related_video_stream?.pending

  useEffect(() => {
    if (video_id) {
      getRelatedVideoStream({ video_id: video_id, page: 1, limit: limit })
    }
    return () => {
      setPage(1)
      setHasMore(true)
      resetRelatedVideoStream()
    }
  }, [video_id])

  useEffect(() => {
    if (page > 1) getRelatedVideoStream({ video_id: video_id, page: page, limit: LIMIT_ITEM })
  }, [page])

  const handleLoadMore = async () => {
    if (relatedVideoStreamData.length > 0 && relatedVideoStreamData.length < LIMIT_ITEM * page) {
      setHasMore(false)
      return
    }
    if (relatedVideoStreamData.length > 0 && relatedVideoStreamData.length == LIMIT_ITEM * page) {
      await setPage(page + 1)
    }
  }

  return (
    <RelatedVideoContext.Provider
      value={{
        hasMore,
        handleLoadMore,
        relatedVideoStreamData,
        isLoading,
      }}
    >
      {children}
    </RelatedVideoContext.Provider>
  )
}

export const useRelatedVideoContext = () => useContext(RelatedVideoContext)
export default RelatedVideoContextProvider
