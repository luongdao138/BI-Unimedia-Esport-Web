import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, useTheme } from '@material-ui/core'
import ESTooltip from '@components/ESTooltip'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { Pagination } from '@material-ui/lab'
import { Colors } from '@theme/colors'
import { ESRoutes } from '@constants/route.constants'
import Link from 'next/link'

const ArchivedListContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const IMG_PLACEHOLDER = '/images/live_stream/thumbnail_default.png'
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const colFirstWidth = 128
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(475))
  const archivedList = Array(5).fill('')

  return (
    <div>
      <HeaderWithButton title={t('archived_list_screen.title')} />
      <Box className={classes.wrapper}>
        <Box className={classes.container}>
          {archivedList.map((k) => {
            return (
              <Box className={classes.wrapItem} key={k}>
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
                          <Box className={classes.empty}>2021年7月1日 15:40</Box>
                          <Box className={classes.release}>{t('archived_list_screen.release')}</Box>
                        </Box>
                      </td>
                    </tr>

                    <tr>
                      {!isMobile && <td>{t('archived_list_screen.titleVideo')}</td>}
                      <td colSpan={isMobile ? 2 : 1}>
                        <Box className={`${classes.titleVideo} ${classes.textEllipsis}`}>
                          <Link
                            href={{
                              pathname: ESRoutes.ARCHIVE_DETAIL,
                            }}
                          >
                            <ESTooltip title="Title" arrow placement="top-start">
                              <div style={{ cursor: 'pointer' }}>Title</div>
                            </ESTooltip>
                          </Link>
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: 'bottom' }} className="abc">
                        <img src={IMG_PLACEHOLDER} className={classes.image} />
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
                                    <Box mr={1} component="span">
                                      <img src={'/images/icons/download.svg'} className={classes.imageReload} />
                                    </Box>
                                    <img src={'/images/icons/trash.svg'} className={classes.imageReload} />
                                  </td>
                                  <td>
                                    <Box>{t('archived_list_screen.viewNumber')}</Box>
                                  </td>
                                </>
                              )}
                              <td colSpan={isMobile ? 3 : 1}>
                                <Box pl={0.5} className={classes.textEllipsis}>
                                  {FormatHelper.currencyFormat('123456')} {t('archived_list_screen.times')}
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
                                <Box pl={0.5} className={classes.textEllipsis}>
                                  {FormatHelper.currencyFormat('123456')} {t('live_stream_screen.comment')}
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
                                <Box pl={0.5} className={classes.textEllipsis}>
                                  {FormatHelper.currencyFormat('123456')} {t('common.eXe_points')}
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
          })}
        </Box>
        <Box className={classes.paginationContainer}>
          <Pagination
            showFirstButton
            showLastButton
            defaultPage={1}
            page={1}
            count={2}
            variant="outlined"
            shape="rounded"
            className={classes.paginationStyle}
            siblingCount={1}
            size={isSmallScreen ? 'small' : 'medium'}
          />
        </Box>
      </Box>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  paginationStyle: {
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
    background: '#000',
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
  textEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  image: {
    width: 120,
  },
  release: {
    color: '#ff4786',
    marginRight: 8,
  },
  cellIcons: {
    verticalAlign: 'bottom',
  },
  paginationContainer: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center',
  },
  [theme.breakpoints.down(415)]: {
    container: {
      padding: '0',
      border: 'none',
      background: 'transparent',
    },
    wrapper: {
      margin: '24px 63px 24px 63px',
    },
    wrapItem: {
      background: '#000',
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
  [theme.breakpoints.down(375)]: {
    paginationStyle: {
      '& .MuiPaginationItem-root': {
        fontSize: '11px',
      },
    },
  },
}))

export default ArchivedListContainer
