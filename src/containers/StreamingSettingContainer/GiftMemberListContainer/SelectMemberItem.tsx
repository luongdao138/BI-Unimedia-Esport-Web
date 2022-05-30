import React from 'react'
import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { GiftMasterType, GiftMasterUserStatus, GiftMasterUserType } from '@services/gift.service'
import { useTranslation } from 'react-i18next'
import useGiftTarget from '@containers/StreamingGiftManagement/useGiftTarget'

type PropType = {
  item?: GiftMasterType
}

const SelectMemberItem: React.FC<PropType> = ({ item }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { removeGiftMasterFromNewGroup } = useGiftTarget()

  const itemType = () => {
    // TODO: One of 「チーム」: team,「個人」: mem cá nhân,「申請中」: màu vàng, admin đang vẫn confirm, 「停止」: admin đã cho block, hiện thị xám
    const { type, status } = item
    if (status !== GiftMasterUserStatus.ACTIVE)
      return status === GiftMasterUserStatus.REQUEST
        ? t('streaming_setting_screen.member_list.tag_approving')
        : t('streaming_setting_screen.member_list.tag_block')

    return type === GiftMasterUserType.TEAM
      ? t('streaming_setting_screen.member_list.tag_team')
      : t('streaming_setting_screen.member_list.tag_individual')
  }

  const itemName = () => {
    return item?.name
  }

  const handleCloseButtonClick = () => {
    removeGiftMasterFromNewGroup(item)
  }

  return (
    <Box className={classes.container}>
      <ESAvatar src={item?.image} alt={item?.name} />
      <Box className={classes.textContainer}>
        <Typography
          className={`${classes.itemType} 
          ${item?.status === GiftMasterUserStatus.REQUEST ? classes.tagRequest : ''} 
          ${item?.status === GiftMasterUserStatus.DEACTIVE ? classes.tagBlock : ''}`}
        >
          {itemType()}
        </Typography>
        <Typography className={classes.name}>{itemName()}</Typography>
      </Box>
      <Box onClick={handleCloseButtonClick} className={classes.buttonRemove}>
        <Icon className={`fa fa-times ${classes.iconRemove}`} fontSize="small" />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  iconRemove: {},
  buttonRemove: {
    alignSelf: 'center',
    padding: '8px',
    cursor: 'pointer',
  },
  container: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    marginTop: '4px',
    marginBottom: '4px',
    borderRadius: '10px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: '8px',
    paddingBottom: '4px',
    paddingTop: '4px',
    marginRight: '24px',
  },
  itemType: {
    width: '52px',
    borderRadius: '5px',
    height: '15px',
    fontSize: '10px',
    color: Colors.white,
    fontWeight: 'bold',
    backgroundColor: '#767676',
    textAlign: 'center',
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
}))

export default SelectMemberItem
