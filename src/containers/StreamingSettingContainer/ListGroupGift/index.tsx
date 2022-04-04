import { MouseEventHandler, useEffect, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme, TableRow, TableCell } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import ESButton from '@components/Button'
import Button from '@components/Button'
import ESTable from '@components/Table'
import Pagination from '@containers/Community/Partials/Pagination'
import useGiftManage from '@containers/StreamingGiftManagement/useGiftTarget'
import ESLoader from '@components/Loader'
import { TabState } from '../GiftManageTab'
import { CommonHelper } from '@utils/helpers/CommonHelper'
// import useMediaQuery from '@material-ui/core/useMediaQuery'

// export interface ListGroupGiftProps {}

interface IProps {
  onChangeTab?: (tab: TabState) => void
  handleSelectGroup?: (groupItem) => void
  handleClose?: (open: boolean) => void
}

const ITEM_PER_PAGE = 10
const ListGroupGift: React.FC<IProps> = ({ onChangeTab, handleSelectGroup, handleClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  // const theme = useTheme()
  // const matchSm = useMediaQuery(theme.breakpoints.down('sm'))

  const { getGiftGroupList, giftGroupList, giftGroupTotal, giftGroupsMeta } = useGiftManage()

  const handleReturn = () => {
    handleClose(false)
  }
  const [page, setPage] = useState(1)
  const getTotalPage = () => Math.ceil(giftGroupTotal / ITEM_PER_PAGE)

  useEffect(() => {
    getGiftGroupList(page, ITEM_PER_PAGE)
  }, [page])

  const handleCreateTip = () => {
    handleReturn()
    onChangeTab(TabState.CREATE_NEW)
  }

  const onSelectGroupComplete = (item) => {
    handleSelectGroup(item)
    handleClose(false)
  }
  return (
    <div>
      <BlankLayout isWide={true}>
        <Box pt={7.5} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center" className={classes.buttonBack}>
            <IconButton className={classes.iconButtonBg} onClick={handleReturn}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2">{t('streaming_gift_report_screen.tip_target_list_selection')}</Typography>
            </Box>
          </Box>
          <Box className={classes.box}>
            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button
                size="small"
                variant="outlined"
                className={classes.btnTip}
                round
                onClick={handleCreateTip}
                startIcon={<Icon style={{ fontSize: 10, color: Colors.white }} className={`fa fa-plus`} />}
              >
                {t('streaming_gift_report_screen.create_tip_target_list')}
              </Button>
            </Box>
            <Box mt={3} mb={3}>
              <Typography className={classes.tipTargetToSet}>{t('streaming_gift_report_screen.select_tip_target_list')}</Typography>
            </Box>
            {giftGroupsMeta.pending ? (
              <Box display="flex" justifyContent="center">
                <ESLoader />
              </Box>
            ) : (
              <>
                {giftGroupTotal > 0 ? (
                  <ESTable
                    tableHeader={
                      <TableRow>
                        <TableCell style={{ width: '10%' }} align="center">
                          <Typography component={'span'}>{t('streaming_gift_report_screen.no')}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography component={'span'}>{t('streaming_gift_report_screen.list_name')}</Typography>
                        </TableCell>
                        <TableCell style={{ width: '10%', minWidth: 64 }} align="left">
                          <Typography component={'span'}>{t('streaming_gift_report_screen.registration_number')}</Typography>
                        </TableCell>
                        <TableCell style={{ width: '20%' }} align="left"></TableCell>
                      </TableRow>
                    }
                  >
                    {CommonHelper.addSttDataList(giftGroupList, ITEM_PER_PAGE, page).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell align="center">
                          <Typography component="span">{item.no}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          {/* <Typography component="span"> {matchSm ? `${item.title.slice(0, 10)}...` : item.title}</Typography> */}
                          <Typography component="span"> {item.title}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography component="span">{item.total_master}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box onClick={() => onSelectGroupComplete(item)} className={classes.btnSelect}>
                            <Typography className={classes.choice} variant="caption">
                              {t('streaming_gift_report_screen.choice')}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </ESTable>
                ) : (
                  <Typography align="center">{t('streaming_setting_screen.no_one_has_been_created_yet')}</Typography>
                )}
              </>
            )}
            <Box display="flex" justifyContent="center" mt={4} pb={2}>
              <Pagination page={page} pageNumber={getTotalPage()} setPage={setPage} />
            </Box>
          </Box>
        </Box>
      </BlankLayout>
    </div>
  )
}

interface ParticipantsButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  isFreezed: boolean
  isTeam: boolean
}

export const ParticipantsButton: React.FC<ParticipantsButtonProps> = ({ onClick, isFreezed, isTeam }) => {
  const { t } = useTranslation('common')
  return (
    <ESButton variant="outlined" fullWidth onClick={onClick}>
      {isFreezed ? t('tournament.participants', { isTeam }) : t('tournament.entry_members')}
    </ESButton>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  buttonBack: {
    borderBottomColor: '#FFFFFF4D',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  box: {
    marginLeft: 32,
    marginRight: 32,
  },
  btnTip: {},
  tipTargetToSet: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
  },
  choice: {
    fontSize: 10,
    backgroundColor: Colors.grey['400'],
    textAlign: 'center',
    borderRadius: 2,
    color: Colors.white,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    wordBreak: 'keep-all',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },

  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  loaderCenter: {
    textAlign: 'center',
  },
  urlCopy: {
    cursor: 'pointer',
  },
  scroll: {
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
    },
  },
  list: {
    overflow: 'auto',
    overflowX: 'hidden',
    height: 600,
    paddingRight: 10,
  },
  btnSelect: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
  [theme.breakpoints.down('md')]: {
    topContainer: {
      paddingTop: 0,
    },
    list: {
      height: 'Calc(100vh - 131px)',
    },
  },
  [theme.breakpoints.down('xs')]: {
    box: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}))

export default ListGroupGift
