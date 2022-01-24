import { MouseEventHandler, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme, TableRow, TableCell } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import ESButton from '@components/Button'
import { useRouter } from 'next/router'
import Button from '@components/Button'
import ESTable from '@components/Table'
import Pagination from '@containers/Community/Partials/Pagination'
import { ESRoutes } from '@constants/route.constants'

// export interface ListGroupGiftProps {}

const rows = [1, 2, 3, 4, 5]
const ListGroupGift: React.FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const classes = useStyles()

  const handleReturn = () => {
    router.push(ESRoutes.VIDEO_STREAMING_SETTING)
  }

  const [page, setPage] = useState(10)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count] = useState(10)

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
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('onLick')
                }}
                startIcon={<Icon style={{ fontSize: 10, color: Colors.white }} className={`fa fa-plus`} />}
              >
                {t('streaming_gift_report_screen.create_tip_target_list')}
              </Button>
            </Box>
            <Box mt={3} mb={3}>
              <Typography className={classes.tipTargetToSet}>{t('streaming_gift_report_screen.select_tip_target_list')}</Typography>
            </Box>
            <ESTable
              tableHeader={
                <TableRow>
                  <TableCell style={{ width: '10%' }} align="center">
                    <Typography component={'span'}>{t('streaming_gift_report_screen.no')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
                    <Typography component={'span'}>{t('streaming_gift_report_screen.list_name')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="left" colSpan={2}>
                    <Typography component={'span'}>{t('streaming_gift_report_screen.registration_number')}</Typography>
                  </TableCell>
                </TableRow>
              }
            >
              {rows.map((row) => (
                <TableRow key={row}>
                  <TableCell align="center">
                    <Typography component="span">1</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="span">チームかやを</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography component="span">1</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="flex-end">
                      <Typography className={classes.choice} variant="caption">
                        個人
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </ESTable>
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination page={page} pageNumber={count} setPage={setPage} />
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
    paddingLeft: 15,
    paddingRight: 15,
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
