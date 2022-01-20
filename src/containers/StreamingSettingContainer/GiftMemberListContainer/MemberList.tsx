import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import ESButton from '@components/Button'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import MemberItem from '@containers/StreamingSettingContainer/GiftMemberListContainer/MemberItem'

const MemberList: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const getData = () => Array.from(Array(20).keys())

  const FilterButton = ({ label, selected = false }) => {
    return (
      <ESButton className={`${classes.filterButton} ${selected ? '' : classes.filterButtonNonSelected}`}>
        <Typography className={classes.filterButtonText}>{label}</Typography>
      </ESButton>
    )
  }

  const AddNewButton = () => {
    return (
      <ESButton className={classes.addNewButton}>
        <Icon className={`fa fa-plus ${classes.iconPlus}`} fontSize="small" />
        <Typography className={classes.addNewButtonText}>{t('streaming_setting_screen.member_list.add_new')}</Typography>
      </ESButton>
    )
  }
  const filterButtonGroup = () => {
    return (
      <Box className={classes.filterButtonGroupContainer}>
        <FilterButton label={'すべて'} selected />
        <FilterButton label={'チーム'} />
        <FilterButton label={'個人'} />
        <Box display="flex" flex={1} flexDirection="row-reverse">
          <AddNewButton />
        </Box>
      </Box>
    )
  }

  const filterInputField = () => {
    return <ESInput className={classes.filterInputField} fullWidth placeholder="キーワード検索" />
  }

  const memberList = useCallback(() => {
    return (
      <Box>
        <Box className={classes.newListHeaderContainer}>
          <Typography className={classes.newListHeader}>{t('streaming_setting_screen.member_list.new_list')}</Typography>
        </Box>
        <Box className={classes.listContainer}>
          {getData().map((_, index) => {
            return <MemberItem key={`MemberItem-${index}`} />
          })}
        </Box>
      </Box>
    )
  }, [])

  return (
    <Box className={classes.container}>
      {filterButtonGroup()}
      {filterInputField()}
      {memberList()}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  filterButton: {
    backgroundColor: '#FFFFFF',
    marginRight: '16px',
    height: '30px',
  },
  filterButtonNonSelected: {
    backgroundColor: '#747474',
  },
  filterButtonText: {
    color: '#212121',
  },
  filterButtonGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterInputField: {
    marginTop: '16px',
  },
  container: {
    marginRight: '6px',
  },
  newListHeader: {
    fontSize: '12px',
    color: Colors.white,
  },
  newListHeaderContainer: {
    backgroundColor: Colors.black,
    borderTopRightRadius: '5px',
    borderTopLeftRadius: '5px',
    border: `1px solid ${Colors.white_opacity['30']}`,
    padding: '8px 40px',
    marginTop: '24px',
  },
  iconPlus: {
    marginRight: '4px',
    color: Colors.white,
  },
  addNewButtonText: {
    color: Colors.white,
    fontSize: '14px',
  },
  addNewButton: {
    alignSelf: 'end',
    padding: '8px 12px',
    borderRadius: '20px',
    border: '1px solid #FFFFFF',
    height: '35px',
  },
  listContainer: {
    border: `1px solid ${Colors.white_opacity['30']}`,
    borderBottomRightRadius: '5px',
    borderBottomLeftRadius: '5px',
    backgroundColor: '#161616',
    height: 'calc(100vh - 464px)',
    overflow: 'scroll',
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
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      padding: '24px',
    },
    addNewButton: {
      display: 'none',
    },
  },
}))
export default MemberList
