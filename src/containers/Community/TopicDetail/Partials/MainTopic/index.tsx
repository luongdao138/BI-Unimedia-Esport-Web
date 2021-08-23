import { Box, Typography, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import LoginRequired from '@containers/LoginRequired'
import { useTranslation } from 'react-i18next'
import useCommunityDetail from '@containers/Community/Detail/useCommunityDetail'
import { useState } from 'react'
import { REPORT_TYPE } from '@constants/common.constants'
import ESReport from '@containers/Report'
import DiscardDialog from '@containers/Community/Partials/DiscardDialog'

type CommunityHeaderProps = {
  user_avatar?: string
  username: string
  mail: string
  discription: string
  date?: string
  count?: number
  image?: string | null
  isConfirm?: boolean
}
const MainTopic: React.FC<CommunityHeaderProps> = ({ username, mail, discription, date, image, count, isConfirm, user_avatar }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const isModerator = true
  const { isAuthenticated } = useCommunityDetail()
  const [openReport, setOpenReport] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const detail = {
    attributes: {
      username: username,
      mail: mail,
      description: discription,
      date: date,
      image: image,
    },
  }

  const handleReportOpen = () => {
    setOpenReport(true)
  }
  const handleDeleteOpen = () => {
    setOpenDelete(true)
  }
  const handleDeleteSubmit = () => {
    //
  }

  return (
    <>
      <Box className={isConfirm ? classes.containerConfirm : classes.container}>
        <Box m={2}>
          <Box className={classes.userContainer} mt={2}>
            <Box className={date ? classes.userInfoContainer : classes.userInfoContainerNoDate}>
              <ESAvatar className={classes.avatar} alt={username} src={user_avatar ? '' : '/images/avatar.png'} />
              <Box className={classes.userInfoBox} ml={1} maxWidth="100%">
                <Typography className={classes.username}>{username}</Typography>
                <Typography className={classes.mail}>{mail}</Typography>
              </Box>
            </Box>
            {date && (count || count == 0) && (
              <Box className={classes.dateReportContainer}>
                <Typography className={classes.date}>{date}</Typography>
              </Box>
            )}
            {!isConfirm && (
              <ESMenu>
                {isModerator && <ESMenuItem onClick={handleDeleteOpen}>{t('common:topic.delete.button')}</ESMenuItem>}
                <LoginRequired>
                  <ESMenuItem onClick={handleReportOpen}>{t('common:topic.report.button')}</ESMenuItem>
                </LoginRequired>
              </ESMenu>
            )}
          </Box>

          <Box className={classes.discriptionContainer} mb={3} mt={3}>
            <Typography className={classes.discription}>{discription}</Typography>
          </Box>
          {image ? (
            <Box
              className={classes.image}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></Box>
          ) : (
            <></>
          )}
          {count || count == 0 ? (
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Box display="flex" justifyContent="flex-end">
                <Box className={classes.numberBox}>
                  <Icon className="fas fa-comment-alt" fontSize="small" />
                </Box>
                <Box className={classes.numberBox} mr={1} ml={1}>
                  <Typography className={classes.count}>{count}</Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Box className={classes.numberBox}>
                  <Icon className="fas fa-comment-alt" fontSize="small" />
                </Box>
                <Box className={classes.numberBox} mr={1} ml={1}>
                  <Typography className={classes.count}>{count}</Typography>
                </Box>
                <Box className={classes.numberBox}>
                  <Icon className="fas fa-share" fontSize="small" style={{ transform: 'scaleX(-1)' }} />
                </Box>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      {isAuthenticated && (
        <>
          <ESReport
            reportType={REPORT_TYPE.TOPIC}
            // target_id={Number(detail.id)}
            data={detail}
            open={openReport}
            handleClose={() => setOpenReport(false)}
          />
          <DiscardDialog
            title={username + t('common:topic.delete.title')}
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onSubmit={handleDeleteSubmit}
            description={t('common:topic.delete.description')}
            confirmTitle={t('common:topic.delete.submit')}
          />
        </>
      )}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: theme.spacing(3),
    backgroundColor: 'black',
    flexDirection: 'column',
    borderRadius: 5,
    border: '1px solid ',
    borderColor: Colors.white_opacity[30],
    marginTop: theme.spacing(1),
  },
  containerConfirm: {
    display: 'flex',
    backgroundColor: 'black',
    flexDirection: 'column',
    borderRadius: 5,
    border: '1px solid ',
    borderColor: Colors.white_opacity[30],
    marginTop: theme.spacing(1),
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    display: 'flex',
    width: 'calc(90% - 150px)',
  },
  userInfoContainerNoDate: {
    display: 'flex',
    width: 'calc(90% - 50px)',
  },
  userAvatarBox: {
    display: 'flex',
    borderRadius: 30,
    width: 50,
    height: 50,
  },
  userInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  dateReportContainer: {
    display: 'flex',
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: ' flex-end',
  },
  reportButton: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  username: {
    fontWeight: 'bold',
    color: 'white',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    fontSize: 16,
  },
  mail: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    fontSize: 12,
  },
  date: {
    fontSize: 11,
    color: Colors.white_opacity[30],
  },
  discriptionContainer: {
    display: 'flex',
  },
  image: {
    display: 'flex',
    paddingTop: '30.27%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    borderRadius: 7,
    width: '66%',
  },
  discription: {
    color: Colors.grey[300],
    fontSize: 14,
  },
  numberBox: {
    display: 'flex',
    alignItems: 'center',
  },
  count: {
    fontSize: 12,
  },
  [theme.breakpoints.down('sm')]: {
    image: {
      width: '80%',
    },
  },
}))

export default MainTopic
