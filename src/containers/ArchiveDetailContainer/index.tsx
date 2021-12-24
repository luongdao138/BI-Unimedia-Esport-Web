import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useArchivedList from '@containers/ArchivedListContainer/useArchivedList'
import useCommonData from '@containers/Lobby/UpsertForm/useCommonData'
import { getTimeZone } from '@utils/helpers/CommonHelper'
import ViewFromLive from '@containers/ArchiveDetailContainer/FromLive'

const DetailContainer: React.FC = () => {
  const router = useRouter()
  const { getVideoArchivedDetail } = useArchivedList()
  const { user } = useCommonData()
  const scheduledFlag = router.query['scheduledFlag'] || router.asPath.match(new RegExp(`[&?]${'scheduledFlag'}=(.*)(&|$)`))
  const [isFromSchedule, setFromSchedule] = useState(scheduledFlag === '1')

  useEffect(() => {
    const params = {
      user_id: user?.id,
      timezone: getTimeZone(),
      video_id: router.query?.uuid,
    }
    getVideoArchivedDetail(params, (canEdit, isSchedule) => {
      if (!canEdit) {
        // router.push(ESRoutes.NOT_FOUND)
      } else if (isSchedule !== isFromSchedule) {
        setFromSchedule(isSchedule)
      }
    })
  }, [router.query])

  return <ViewFromLive isFromSchedule={isFromSchedule} />
}

export default DetailContainer
