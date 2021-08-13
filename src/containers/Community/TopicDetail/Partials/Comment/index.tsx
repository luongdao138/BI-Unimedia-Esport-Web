import { Box, Typography } from '@material-ui/core'
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
import DeleteDialog from '../DeleteDialog'

type CommunityHeaderProps = {
  username: string
  mail: string
  discription: string
  date: string
  number: number
  image?: string
}
const Comment: React.FC<CommunityHeaderProps> = ({ username, mail, discription, date, image, number }) => {
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
      number: number,
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
      <Box className={classes.container}>
        <Box className={classes.userContainer}>
          <Box className={classes.userInfoContainer}>
            <Typography className={classes.number}>{number}</Typography>
            <Box ml={1}>
              <ESAvatar className={classes.avatar} alt={username} src={username ? '' : '/images/avatar.png'} />
            </Box>

            <Box className={classes.userInfoBox} ml={1} maxWidth="67%">
              <Typography className={classes.username}>{username}</Typography>
              <Typography className={classes.mail}>{mail}</Typography>
            </Box>
          </Box>
          <Box className={classes.dateReportContainer}>
            <Typography className={classes.date}>{date}</Typography>
            <ESMenu>
              {isModerator && <ESMenuItem onClick={handleDeleteOpen}>{t('common:topic_comment.delete.button')}</ESMenuItem>}
              <LoginRequired>
                <ESMenuItem onClick={handleReportOpen}>{t('common:topic_comment.report.button')}</ESMenuItem>
              </LoginRequired>
            </ESMenu>
          </Box>
        </Box>

        <Box className={classes.discriptionContainer} mb={3}>
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
      </Box>
      {isAuthenticated && (
        <>
          <ESReport
            reportType={REPORT_TYPE.TOPIC_COMMENT}
            // target_id={Number(detail.id)}
            data={detail}
            open={openReport}
            handleClose={() => setOpenReport(false)}
          />
          <DeleteDialog
            title={t('common:topic_comment.delete.title')}
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onSubmit={handleDeleteSubmit}
            description1={t('common:topic_comment.delete.description1')}
            description2={t('common:topic_comment.delete.description2')}
            confirmTitle={t('common:topic_comment.delete.submit')}
            cancelTitle={t('common:common.cancel')}
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
    marginBottom: theme.spacing(2),
    flexDirection: 'column',
    borderTop: '2px solid rgba(255,255,255,0.1)',
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px 0`,
  },
  userContainer: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    display: 'flex',
    width: '67%',
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
    zIndex: 30,
    width: 40,
    height: 40,
  },
  username: {
    fontWeight: 'bold',
    color: 'white',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  mail: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
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
    borderRadius: '7px',
    width: '66%',
  },
  discription: {
    color: Colors.white_opacity[70],
  },
  number: {
    fontSize: 10,
  },
  [theme.breakpoints.down('sm')]: {
    image: {
      width: '80%',
    },
  },
}))

export default Comment
