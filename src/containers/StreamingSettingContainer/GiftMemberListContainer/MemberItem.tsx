import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

const MemberItem: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const buttonText = () => {
    // TODO: One of 「選択」: da duoc them,「選択済」: them vao
    return t('streaming_setting_screen.member_list.select')
  }

  const tagText = () => {
    // TODO: One of 「チーム」: team,「個人」: mem cá nhân,「申請中」: màu vàng, admin đang vẫn confirm, 「停止」: admin đã cho block, hiện thị xám
    return t('streaming_setting_screen.member_list.tag_team')
  }

  const name = () => {
    return 'もるチャン'
  }

  return (
    <Box className={classes.container}>
      <ESAvatar
        src={
          'https://i.guim.co.uk/img/media/adb81d8dde35e9acdbb37a6d39c2725ba01c5379/328_278_4497_2698/master/4497.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=f6d97defc0bc3a3ea7f081f2b440374f'
        }
      />
      <Box className={classes.textContainer}>
        <Box className={classes.tagContainer}>
          <Typography className={classes.tag}>{tagText()}</Typography>
        </Box>
        <Typography className={classes.name}>{name()}</Typography>
      </Box>
      <ESButton className={classes.actionButton}>
        <Typography className={classes.buttonText}>{buttonText()}</Typography>
      </ESButton>
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
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  tag: {
    width: '52px',
    textAlign: 'center',
    backgroundColor: '#F4F43A',
    borderRadius: '5px',
    color: Colors.black,
    fontSize: '10px',
    fontWeight: 'bold',
  },
  name: {
    color: Colors.white_opacity['70'],
    marginBottom: '4px',
  },
  actionButton: {
    alignSelf: 'center',
    width: '70px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: '14px',
    fontWeight: 'bold',
  },
}))
export default MemberItem
