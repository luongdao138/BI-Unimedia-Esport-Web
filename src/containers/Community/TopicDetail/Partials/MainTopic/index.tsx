import { Box, Typography, Icon, IconButton } from '@material-ui/core'
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
import { SRLWrapper } from 'simple-react-lightbox'
import { LIGHTBOX_OPTIONS } from '@constants/common.constants'

type CommunityHeaderProps = {
  user_avatar?: string
  username: string
  mail: string
  description: string
  date?: string
  count?: number
  image?: string | null
  isConfirm?: boolean
  hash_key?: string
  handleDelete?: () => void
}
const MainTopic: React.FC<CommunityHeaderProps> = ({
  username,
  mail,
  description,
  date,
  image,
  count,
  isConfirm,
  hash_key,
  user_avatar,
  handleDelete,
}) => {
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
      description: description,
      date: date,
      image: image,
      hash_key: hash_key,
    },
  }

  const handleReportOpen = () => {
    setOpenReport(true)
  }
  const handleDeleteOpen = () => {
    setOpenDelete(true)
  }

  const renderClickableImage = () => {
    return (
      <SRLWrapper options={LIGHTBOX_OPTIONS}>
        <img className={classes.imageBox} src={image} />
      </SRLWrapper>
    )
  }

  return (
    <>
      <Box className={isConfirm ? classes.containerConfirm : classes.container}>
        <Box m={2}>
          <Box className={classes.userContainer}>
            <Box className={date ? classes.userInfoContainer : classes.userInfoContainerNoDate}>
              <ESAvatar className={classes.avatar} alt={username} src={user_avatar} />
              <Box className={classes.userInfoBox} ml={1} maxWidth="100%">
                <Typography className={classes.username}>{username}</Typography>
                <Typography className={classes.mail}>{mail}</Typography>
              </Box>
            </Box>
            {date && (
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

          <Box className={classes.descriptionContainer} mb={2} mt={1}>
            <Typography className={classes.description}>{description}</Typography>
          </Box>
          {image && renderClickableImage()}
          {count || count == 0 ? (
            <Box display="flex" justifyContent="space-between" mt={2}>
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
                  <IconButton style={{ padding: 4 }}>
                    <Icon className="fas fa-share" fontSize="small" style={{ transform: 'scaleX(-1)' }} />
                  </IconButton>
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
            target_id={detail.attributes.hash_key}
            data={detail}
            open={openReport}
            handleClose={() => setOpenReport(false)}
          />
          <DiscardDialog
            title={username + t('common:topic.delete.title')}
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onSubmit={handleDelete}
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
  descriptionContainer: {
    display: 'flex',
  },
  description: {
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
  imageBox: {
    display: 'flex',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    borderRadius: 7,
    width: '66%',
  },
  [theme.breakpoints.down('sm')]: {
    imageBox: {
      width: '80%',
    },
  },
}))

export default MainTopic
