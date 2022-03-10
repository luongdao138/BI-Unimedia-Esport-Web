import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { GiftMasterType, GiftMasterUserStatus } from '@services/gift.service'
import useGiftTarget from '@containers/StreamingGiftManagement/useGiftTarget'

type Prop = {
  item?: GiftMasterType
}
const MemberItem: React.FC<Prop> = ({ item }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { includedInNewList, addGiftMasterToNewGroup } = useGiftTarget()
  const included = includedInNewList(item)

  const buttonText = () => {
    // TODO: One of 「選択」: da duoc them,「選択済」: them vao
    return included ? t('streaming_setting_screen.member_list.selected') : t('streaming_setting_screen.member_list.select')
  }

  const tagText = () => {
    // TODO: One of 「チーム」: team,「個人」: mem cá nhân,「申請中」: màu vàng, admin đang vẫn confirm, 「停止」: admin đã cho block, hiện thị xám
    const { type, status } = item
    if (status !== GiftMasterUserStatus.ACTIVE)
      return status === GiftMasterUserStatus.REQUEST
        ? t('streaming_setting_screen.member_list.tag_approving')
        : t('streaming_setting_screen.member_list.tag_block')

    return type === 1 ? t('streaming_setting_screen.member_list.tag_team') : t('streaming_setting_screen.member_list.tag_individual')
  }

  const name = () => {
    return item?.name
  }

  const handleActionButtonClick = () => {
    if (!included) {
      addGiftMasterToNewGroup(item)
    }
  }

  return (
    <Box className={classes.container}>
      <ESAvatar src={item?.image} alt={name()} />
      <Box className={classes.textContainer}>
        <Box className={classes.tagContainer}>
          <Typography
            className={`${classes.tag} ${item?.status === GiftMasterUserStatus.REQUEST ? classes.tagRequest : ''} ${
              item?.status === GiftMasterUserStatus.DEACTIVE ? classes.tagBlock : ''
            }`}
          >
            {tagText()}
          </Typography>
        </Box>
        <Typography className={classes.name}>{name()}</Typography>
      </Box>
      {item?.status !== GiftMasterUserStatus.DEACTIVE ? (
        <ESButton onClick={handleActionButtonClick} className={`${classes.actionButton} ${included ? classes.actionButtonSelected : ''}`}>
          <Typography className={classes.buttonText}>{buttonText()}</Typography>
        </ESButton>
      ) : (
        <Typography className={`${classes.buttonText} block-master`}>{t('streaming_setting_screen.member_list.invalid')}</Typography>
      )}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '8px 21px',
  },
  textContainer: {
    flex: 1,
    marginLeft: '8px',
    display: 'flex',
    flexDirection: 'column',
    marginRight: '24px',
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  tag: {
    width: '52px',
    textAlign: 'center',
    backgroundColor: '#575757',
    borderRadius: '5px',
    color: Colors.white,
    fontSize: '10px',
    fontWeight: 'bold',
  },

  tagRequest: {
    backgroundColor: '#F4F43A',
    color: Colors.black,
  },
  tagBlock: {
    color: Colors.white_opacity['30'],
    backgroundColor: '#707070',
  },
  name: {
    color: Colors.white_opacity['70'],
    marginBottom: '4px',
    marginTop: '8px',
  },
  actionButton: {
    width: '70px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    backgroundColor: '#575757',
  },
  actionButtonSelected: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: '14px',
    fontWeight: 'bold',
    '&.block-master': {
      width: '70px',
      textAlign: 'center',
      color: Colors.white_opacity['30'],
    },
  },
}))
export default MemberItem
