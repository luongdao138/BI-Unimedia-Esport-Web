import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ButtonPrimary from '@components/ButtonPrimary'
import React, { FC } from 'react'
import { Colors } from '@theme/colors'
import GiftItem from '@containers/StreamingGiftManagement/giftitem'
import useGiftManage from './useGiftTarget'

type ListTargetPersonType = {
  handlePress?: () => void
  handleModeUpdate: (id: string) => void
}
const ListTargetPerson: FC<ListTargetPersonType> = ({ handlePress, handleModeUpdate }): JSX.Element => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()

  const { giftTargetData } = useGiftManage()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const pageMessage = isMobile ? t('streaming_gift_management.empty_message_md') : t('streaming_gift_management.empty_message')
  return (
    <>
      <Box className={classes.listContainer}>
        <span className={classes.label}>{pageMessage}</span>
        {giftTargetData?.length > 0 ? (
          <Box className={classes.list}>
            {giftTargetData.map((item, index) => {
              return <GiftItem key={item.sns_url} index={index + 1} item={item} handleModeUpdate={handleModeUpdate} />
            })}
          </Box>
        ) : (
          <></>
        )}
        <ButtonPrimary size="small" className={classes.addButton} gradient={false} onClick={handlePress}>
          {t('streaming_gift_management.add')}
        </ButtonPrimary>
      </Box>
    </>
  )
}
const useStyles = makeStyles((theme) => ({
  label: {
    color: Colors.white_opacity['70'],
    fontSize: '14px',
    textAlign: 'center',
    whiteSpace: 'pre',
  },
  list: {
    paddingLeft: '83px',
    paddingRight: '83px',
    width: '100%',
  },
  listContainer: {
    paddingTop: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBottom: '162px',
  },
  addButton: {
    width: '160px !important',
    height: '38px !important',
    borderRadius: '5px !important',
    margin: '31px 0',
  },
  [theme.breakpoints.down('md')]: {
    label: {
      margin: '0 24px',
    },
    list: {
      paddingLeft: '24px',
      paddingRight: '24px',
      width: '100%',
    },
  },
}))

export default ListTargetPerson
