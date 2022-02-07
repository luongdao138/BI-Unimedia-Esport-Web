import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Footer from '@containers/StreamingGiftManagement/footer'
import ButtonPrimary from '@components/ButtonPrimary'
import React, { FC } from 'react'
import { Colors } from '@theme/colors'
import GiftItem from '@containers/StreamingGiftManagement/giftitem'
import { useRouter } from 'next/router'
import useGiftManage from './useGiftTarget'
import { useAppDispatch } from '@store/hooks'
import { addToast } from '@store/common/actions'
import i18n from '@locales/i18n'

type ListTargetPersonType = {
  handlePress?: () => void
  handleFooterConfirm?: () => void
  errorMessage?: string
}
const ListTargetPerson: FC<ListTargetPersonType> = ({ handlePress, handleFooterConfirm, errorMessage }): JSX.Element => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const router = useRouter()
  const { giftTargetData } = useGiftManage()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // console.log('giftTargetData >>>>>', giftTargetData)

  const handleOnFooterCancelClick = () => {
    router.back()
  }
  const handleFooterConfirmPress = () => {
    handleFooterConfirm()
    dispatch(addToast(i18n.t('common:streaming_gift_management.toast_message_success')))
  }
  const pageMessage = isMobile ? t('streaming_gift_management.empty_message_md') : t('streaming_gift_management.empty_message')
  // const getGiftData = () => Array.from(Array(10).keys())
  return (
    <>
      <Box className={classes.listContainer}>
        <span className={classes.label}>{pageMessage}</span>
        {giftTargetData?.length > 0 ? (
          <Box className={classes.list}>
            {giftTargetData.map((item, index) => {
              return <GiftItem key={item.sns_url} index={index + 1} item={item} />
            })}
          </Box>
        ) : (
          <></>
        )}
        <ButtonPrimary size="small" className={classes.addButton} gradient={false} onClick={handlePress}>
          {t('streaming_gift_management.add')}
        </ButtonPrimary>
      </Box>
      <Footer onCancel={handleOnFooterCancelClick} onConfirm={handleFooterConfirmPress} errorMessage={errorMessage} />
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
