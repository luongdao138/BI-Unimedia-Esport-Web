import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, useTheme } from '@material-ui/core'
import ESTooltip from '@components/ESTooltip'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { Pagination } from '@material-ui/lab'
import { Colors } from '@theme/colors'
import { ESRoutes } from '@constants/route.constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useArchivedList from '@containers/ArchivedListContainer/useArchivedList'
import React, { useEffect, useState } from 'react'
import useCommonData from '@containers/Lobby/UpsertForm/useCommonData'
import { getTimeZone } from '@utils/helpers/CommonHelper'
import moment from 'moment'
import { FORMAT_DATE_TIME_JP, LIVE_VIDEO_TYPE } from '@constants/common.constants'
import { STATUS_VIDEO } from '@services/videoTop.services'
import VideoDeleteConfirmModal from '@containers/ArchiveDetailContainer/DeleteVideoConfirmModal/VideoDeleteConfirmModal'
import ESLoader from '@components/FullScreenLoader'
import { CookieData } from '@services/archiveList.service'
import axios from 'axios'

const ITEM_PER_PAGE = 25

const ArchivedListContainer: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const classes = useStyles()
  const IMG_PLACEHOLDER = '/images/live_stream/thumbnail_default.png'
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const colFirstWidth = 160
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(475))

  const {
    videoArchivedList,
    getVideoArchivedList,
    deleteVideoDetail,
    overrideDeleteVideo,
    meta_archive_list,
    getCookieVideoDownload,
  } = useArchivedList()
  const { user } = useCommonData()
  const [page, setPage] = useState(1)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedDeleteVideo, setSelectedDeleteVideo] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteErrorMsg, setDeleteMsg] = useState('')

  const isLoading = !!meta_archive_list.pending

  const getArchiveList = () => {
    if (!videoArchivedList) {
      return []
    }
    const { videos } = videoArchivedList
    return videos
  }

  const totalPage = (videoArchivedList?.total ?? 0) / ITEM_PER_PAGE + 1

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false)
  }

  const handleOpenDeleteModal = () => {
    setDeleteModalVisible(true)
    setDeleteMsg('')
  }

  const onDelete = () => {
    const { uuid } = selectedDeleteVideo
    const requestParams = {
      user_id: user?.id,
      video_id: uuid,
    }
    setDeleteLoading(true)
    deleteVideoDetail(requestParams, (isSuccess, message) => {
      setDeleteLoading(false)
      // Update list
      overrideDeleteVideo(uuid)
      // Back to prev screen
      if (isSuccess) {
        handleCloseDeleteModal()
      } else {
        setDeleteMsg(message)
      }
    })
  }

  const redirectArchivedDetail = (uuid, scheduledFlag) => () => {
    router.push({
      pathname: ESRoutes.ARCHIVE_DETAIL,
      query: { uuid, scheduledFlag },
    })
  }

  const fetchArchiveListRequestParams = () => {
    return {
      user_id: user?.id,
      timezone: getTimeZone(),
      page,
      limit: ITEM_PER_PAGE,
    }
  }

  useEffect(() => {
    getVideoArchivedList(fetchArchiveListRequestParams())
  }, [page])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderRow = (rowData) => {
    const {
      live_stream_start_time: startTime,
      publish_flag: publishFlag,
      title,
      num_counted_user: countedUser = '0',
      total_chat: totalChat = '0',
      total_point_chat: totalPoint = '0',
      thumbnail,
      uuid,
      scheduled_flag: scheduledFlag,
      convert_status,
    } = rowData

    const getVidID = () => {
      let vid = rowData?.uuid
      if (rowData.status === STATUS_VIDEO.LIVE_STREAM && rowData.scheduled_flag === LIVE_VIDEO_TYPE.LIVE) {
        vid = rowData?.user_id
      }
      return vid
    }

    const handleDeleteVideoClick = (rowData) => () => {
      setSelectedDeleteVideo(rowData)
      handleOpenDeleteModal()
    }

    const handleDownloadVideo = () => {
      getCookieVideoDownload({ video_id: rowData?.uuid }, async (dataCookie: CookieData) => {
        const { data } = await axios.get(dataCookie.url, {
          headers: {
            // Authorization: `Bearer ${user?.accessToken}`,
            Cookies: `CloudFront-Expires=${dataCookie?.['CloudFront-Expires']};CloudFront-Signature=${dataCookie?.['CloudFront-Signature']};CloudFront-Key-Pair-Id=${dataCookie?.['CloudFront-Key-Pair-Id']};`,
          },
        })
        // eslint-disable-next-line no-console
        console.log('set cookie data====', data)
      })
    }

    return (
      <Box className={classes.wrapItem} key={rowData?.uuid} onClick={isMobile ? redirectArchivedDetail(uuid, scheduledFlag) : null}>
        <table className={classes.outerTable}>
          <colgroup>
            <col style={{ width: colFirstWidth }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <tbody>
            <tr>
              {!isMobile && <td>{t('archived_list_screen.delivery_date_time')}</td>}
              <td colSpan={isMobile ? 2 : 1}>
                <Box display="flex" justifyContent="space-between">
                  <Box className={classes.empty}>{moment(startTime).format(FORMAT_DATE_TIME_JP)}</Box>
                  <Link href={{ pathname: ESRoutes.ARCHIVE_DETAIL, query: { uuid, scheduledFlag } }}>
                    <Box className={classes.release}>
                      <Typography component="span" style={{ cursor: 'pointer' }}>
                        {publishFlag === 1 ? t('archived_list_screen.release') : t('archived_list_screen.not_release')}
                      </Typography>{' '}
                    </Box>
                  </Link>
                </Box>
              </td>
            </tr>

            <tr>
              {!isMobile && <td>{t('archived_list_screen.titleVideo')}</td>}
              <td colSpan={isMobile ? 2 : 1}>
                <Box className={classes.titleVideo}>
                  {isMobile && (
                    <Typography component="span">
                      <div className={classes.textEllipsis}>{title}</div>
                    </Typography>
                  )}
                  {!isMobile && (
                    <Box flexDirection="row" display="flex">
                      <ESTooltip title={rowData?.title} arrow placement="top-start" style={{ maxWidth: '500px' }}>
                        <div className={classes.textEllipsis}>{rowData?.title}</div>
                      </ESTooltip>
                    </Box>
                  )}
                </Box>
              </td>
            </tr>
            <tr>
              <td style={{ verticalAlign: 'bottom', paddingRight: 10 }} className={classes.wrapImage}>
                <a target="_blank" rel="noopener noreferrer" href={`${ESRoutes.TOP}?vid=${getVidID()}`}>
                  <img src={thumbnail ?? IMG_PLACEHOLDER} className={classes.image} />
                </a>
              </td>
              <td>
                <table className={classes.innerTable}>
                  {!isMobile && (
                    <colgroup>
                      <col style={{ width: 'auto' }} />
                      <col style={{ width: 127 }} />
                      <col style={{ width: 200 }} />
                    </colgroup>
                  )}
                  <tbody>
                    <tr>
                      {!isMobile && (
                        <>
                          <td rowSpan={3} className={classes.cellIcons}>
                            <Box mr={1} component="span" onClick={handleDownloadVideo}>
                              <img
                                src={'/images/icons/download.svg'}
                                className={convert_status === 'PROCESSING' ? classes.imageReloadProcessing : classes.imageReload}
                              />
                            </Box>

                            <Box mr={1} component="span" onClick={handleDeleteVideoClick(rowData)}>
                              <img src={'/images/icons/trash.svg'} className={classes.imageReload} />
                            </Box>
                          </td>
                          <td>
                            <Box>{t('archived_list_screen.viewNumber')}</Box>
                          </td>
                        </>
                      )}
                      <td colSpan={isMobile ? 3 : 1}>
                        <Box pl={0.5}>
                          <Typography component="span" className={classes.wordBreak}>
                            {FormatHelper.currencyFormat(countedUser ?? '0')} {t('archived_list_screen.times')}
                          </Typography>
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      {!isMobile && (
                        <td>
                          <Box>{t('archived_list_screen.commentNumber')}</Box>
                        </td>
                      )}
                      <td colSpan={isMobile ? 3 : 1}>
                        <Box pl={0.5}>
                          <Typography component="span" className={classes.wordBreak}>
                            {FormatHelper.currencyFormat(totalChat ?? '0')} {t('live_stream_screen.comment')}
                          </Typography>
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      {!isMobile && (
                        <td>
                          <Box>{t('archived_list_screen.receivedPointNumber')}</Box>
                        </td>
                      )}
                      <td colSpan={isMobile ? 3 : 1}>
                        <Box pl={0.5}>
                          <Typography component="span" className={classes.wordBreak}>
                            {FormatHelper.currencyFormat(totalPoint ?? '0')} {t('common.eXe_points')}
                          </Typography>
                        </Box>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    )
  }

  const getTotalPage = () => Math.ceil(videoArchivedList.total / ITEM_PER_PAGE)

  const onChangePage = (_, value: number): void => {
    setPage(value)
  }

  const pagination = (isTopPagination = false) => {
    return (
      <Box className={isTopPagination ? classes.paginationContainerTop : classes.paginationContainerBottom}>
        <Pagination
          showFirstButton
          showLastButton
          defaultPage={1}
          page={page}
          count={getTotalPage()}
          variant="outlined"
          shape="rounded"
          className={classes.paginationStyle}
          siblingCount={1}
          size={isSmallScreen ? 'small' : 'medium'}
          onChange={onChangePage}
        />
      </Box>
    )
  }

  return (
    <div>
      <HeaderWithButton title={t('archived_list_screen.title')} />
      <Box className={classes.wrapper}>
        {totalPage > 1 && pagination(true)}
        <Box className={classes.container}>
          {getArchiveList().length > 0 && getArchiveList().map((k) => renderRow(k))}
          {getArchiveList().length === 0 && (
            <Box>
              <Typography>{t('archived_list_screen.no_archive')}</Typography>
            </Box>
          )}
        </Box>
        {totalPage > 1 && pagination()}
        <VideoDeleteConfirmModal
          open={deleteModalVisible}
          video={selectedDeleteVideo}
          handleClose={handleCloseDeleteModal}
          handleDeleteVideo={onDelete}
          isLoading={deleteLoading}
          deleteError={deleteErrorMsg}
        />
      </Box>
      <ESLoader open={isLoading} />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  imageReload: {
    cursor: 'pointer',
  },
  imageReloadProcessing: {
    opacity: 0.3,
  },
  paginationStyle: {
    marginRight: '-24px',
    '& .MuiPaginationItem-root': {
      color: Colors.white,
      borderColor: Colors.primary,
      borderWidth: 1,
      maxWidth: '32px',
      maxHeight: '32px',
      width: 'calc((100vw - 48px) / 15)',
      height: 'calc((100vw - 48px) / 15)',
      minWidth: 'unset',
      minHeight: 'unset',
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
    },
    '& .MuiPaginationItem-ranges': {},
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '24px',
  },
  container: {
    width: '100%',
    borderRadius: '5px',
    border: '1px solid rgb(255 255 255 / 30%)',
    background: '#000000',
    padding: '16px',
  },
  wrapItem: {
    '& table': {
      tableLayout: 'fixed',
      borderSpacing: 0,
      width: '100%',
      '& tr': {
        width: '100%',
        '& td': {
          padding: 0,
        },
        '&:not(:last-child)': {
          '& td': {
            paddingBottom: '8px',
            '&$cellIcons': {
              paddingBottom: 0,
            },
          },
        },
      },
    },
    borderRadius: '5px',
    border: '1px solid rgb(255 255 255 / 30%)',
    background: '#181818',
    padding: '16px 22px 12px 40px',
    color: 'rgb(255 255 255 / 70%)',
    fontSize: '14px',
    '&:not(:last-child)': {
      marginBottom: '16px',
    },
  },
  outerTable: {
    '& >tbody': {
      '& >tr': {
        '& >td': {
          '&:first-child': {
            // width: 120,
          },
        },
      },
    },
  },
  innerTable: {
    '& >tbody': {
      '& tr': {
        '& td': {
          textAlign: 'right',
          '&$cellIcons': {
            textAlign: 'left',
          },
        },
      },
    },
  },
  titleVideo: {},
  wordBreak: {
    wordBreak: 'break-word',
  },
  textEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  wrapImage: {
    width: 150,
  },
  image: {
    width: '100%',
    cursor: 'pointer',
  },
  release: {
    color: '#FF4786',
    marginRight: 8,
  },
  cellIcons: {
    verticalAlign: 'bottom',
  },
  paginationContainerTop: {
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
  },
  paginationContainerBottom: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center',
  },
  [theme.breakpoints.down(415)]: {
    paginationContainerTop: {
      justifyContent: 'center',
    },
    container: {
      padding: '0',
      border: 'none',
      background: 'transparent',
    },
    wrapper: {
      margin: '24px 30px 24px 30px',
    },
    wrapItem: {
      background: '#000000',
      padding: '8px 12px 5px 12px',
      '& table': {
        '& tr': {
          '&:not(:last-child)': {
            '& td': {
              paddingBottom: 0,
            },
          },
        },
      },
    },
    outerTable: {
      '& >tr': {
        '& >td': {
          '&:first-child': {
            // width: 120,
          },
        },
      },
    },
    release: {
      marginRight: 0,
    },
    innerTable: {
      '& tr': {
        '& td': {
          textAlign: 'right',
          '&$cellIcons': {
            textAlign: 'left',
          },
        },
      },
    },
  },
  [theme.breakpoints.down(961)]: {
    paginationStyle: {
      marginRight: '0px',
    },
  },
  [theme.breakpoints.down(375)]: {
    paginationStyle: {
      '& .MuiPaginationItem-root': {
        fontSize: '11px',
      },
    },
    wrapper: {
      margin: '24px 15px 24px 15px',
    },
  },
}))

export default ArchivedListContainer
