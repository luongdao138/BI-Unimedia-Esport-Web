import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import SelectMemberItem from '@containers/StreamingSettingContainer/GiftMemberListContainer/SelectMemberItem'
import Footer from '@containers/StreamingSettingContainer/GiftMemberListContainer/footer'
import useGiftTarget from '@containers/StreamingGiftManagement/useGiftTarget'
import CharacterLimited from '@components/CharacterLimited'
import { useAppDispatch } from '@store/hooks'
import * as commonActions from '@store/common/actions'

type Props = {
  handleBackToListState?: () => void
}

const GiftMemberListContainer: React.FC<Props> = ({ handleBackToListState }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const { newGiftGroupGiftMasterList, createNewGiftGroup } = useGiftTarget()
  const [title, setTitle] = useState('')

  const getData = () => newGiftGroupGiftMasterList

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value)
  }

  const header = () => {
    return (
      <Box className={classes.header}>
        <Box className={classes.nameListLabelContainer}>
          <Typography className={classes.nameListLabel}>{t('streaming_setting_screen.member_list.name_list')}</Typography>
          <Typography className={classes.requireTag}>{t('streaming_setting_screen.member_list.require')}</Typography>
        </Box>
        <ESInput
          fullWidth
          placeholder={t('streaming_setting_screen.member_list.name_entered_place_holder')}
          className={classes.inputName}
          endAdornment={<CharacterLimited value={title} limit={60} />}
          value={title}
          onChange={handleTitleInputChange}
        />
      </Box>
    )
  }

  const emptyListView = () => {
    return (
      <Box className={classes.emptyView}>
        <Typography className={classes.emptyViewMessage}>{t('streaming_setting_screen.member_list.empty_view_message')}</Typography>
      </Box>
    )
  }

  const listWithData = useCallback(() => {
    return (
      <Box className={classes.listWithDataContainer}>
        {getData().map((item, index) => {
          return <SelectMemberItem key={`listWithData-${index}`} item={item} />
        })}
      </Box>
    )
  }, [getData()])

  const memberList = () => {
    return <Box className={classes.listContainer}>{getData().length > 0 ? listWithData() : emptyListView()}</Box>
  }

  const handleOnSuccessCallback = () => {
    dispatch(commonActions.addToast(t('streaming_setting_screen.member_list.create_group_success')))
    handleBackToListState()
  }

  const handleOnConfirmClick = () => {
    const requestData = {
      title,
      group_item: newGiftGroupGiftMasterList.map(({ id }) => id),
    }
    createNewGiftGroup(requestData, handleOnSuccessCallback)
  }

  return (
    <Box className={classes.container}>
      {header()}
      {memberList()}
      <Footer onConfirm={handleOnConfirmClick} onCancel={handleBackToListState} />
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: '4px',
  },
  container: {
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px',
  },
  nameListLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameListLabel: {
    fontSize: '14px',
    color: Colors.white['70'],
  },
  requireTag: {
    fontSize: '10px',
    color: Colors.white,
    backgroundColor: Colors.primary,
    padding: '1px 4px',
    borderRadius: '5px',
    marginLeft: '8px',
  },
  inputName: {
    marginTop: '8px',
  },
  listContainer: {
    height: 'calc(100vh - 482px)',
    marginTop: '16px',
    backgroundColor: Colors.black,
    borderRadius: '5px',
    border: `1px solid ${Colors.white_opacity['30']}`,
    display: 'flex',
  },
  emptyViewMessage: {
    whiteSpace: 'pre',
    textAlign: 'center',
    fontSize: '14px',
    color: Colors.white_opacity['70'],
  },
  emptyView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listWithDataContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 24px',
    margin: '24px 0',
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
      backgroundColor: '#222222',
      borderRadius: 6,
    },
    overflowX: 'hidden',
    overflow: 'scroll',
  },
  [theme.breakpoints.down('sm')]: {
    listWithDataContainer: {
      padding: '0 8px',
    },
    container: {
      paddingRight: '20px',
    },
  },
}))

export default GiftMemberListContainer
