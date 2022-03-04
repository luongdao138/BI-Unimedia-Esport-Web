import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import ESButton from '@components/Button'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import MemberItem from '@containers/StreamingSettingContainer/GiftMemberListContainer/MemberItem'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useGiftTarget from '@containers/StreamingGiftManagement/useGiftTarget'
import { GiftMasterUserType } from '@services/gift.service'
import _ from 'lodash'

const MemberList: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const classes = useStyles()

  const { getAllGiftMaster, giftMasterList, reloadGiftMasterFlag } = useGiftTarget()

  const [filterByType, setFilterByType] = useState(GiftMasterUserType.NO_FILTER)
  const [filterByName, setFilterByName] = useState('')

  useEffect(() => {
    getAllGiftMaster(filterByName, filterByType)
  }, [])

  useEffect(() => {
    if (reloadGiftMasterFlag) {
      getAllGiftMaster(filterByName, filterByType)
    }
  }, [reloadGiftMasterFlag])

  const getData = () => giftMasterList

  const onFilterButtonClick = (option) => () => {
    setFilterByType(option)
    filterByTypeDebounce(option)
  }

  const FilterButton = ({ label, option }) => {
    const selected = option === filterByType
    return (
      <ESButton
        onClick={onFilterButtonClick(option)}
        className={`${classes.filterButton} ${selected ? '' : classes.filterButtonNonSelected}`}
      >
        <Typography className={classes.filterButtonText}>{label}</Typography>
      </ESButton>
    )
  }

  const handleNewButtonClick = () => {
    router.push(ESRoutes.GIFT_MANAGEMENT)
  }

  const AddNewButton = () => {
    return (
      <ESButton className={classes.addNewButton} onClick={handleNewButtonClick}>
        <Icon className={`fa fa-plus ${classes.iconPlus}`} fontSize="small" />
        <Typography className={classes.addNewButtonText}>{t('streaming_setting_screen.member_list.add_new')}</Typography>
      </ESButton>
    )
  }

  const filterButtonGroup = useCallback(() => {
    return (
      <Box className={classes.filterButtonGroupContainer}>
        <FilterButton label={t('streaming_setting_screen.member_list.filter_all')} option={GiftMasterUserType.NO_FILTER} />
        <FilterButton label={t('streaming_setting_screen.member_list.tag_team')} option={GiftMasterUserType.TEAM} />
        <FilterButton label={t('streaming_setting_screen.member_list.filter_individual')} option={GiftMasterUserType.INDIVIDUAL} />
        <Box display="flex" flex={1} flexDirection="row-reverse">
          <AddNewButton />
        </Box>
      </Box>
    )
  }, [filterByType])

  const filterByTypeDebounce = useCallback(
    _.debounce((type) => {
      getAllGiftMaster(filterByName, type)
    }, 700),
    []
  )
  const inputDebounce = useCallback(
    _.debounce((keyword: string, type) => {
      getAllGiftMaster(keyword, type)
    }, 350),
    []
  )

  const handleChange = (e) => {
    const { value } = e.target
    setFilterByName(value)
    inputDebounce(value, filterByType)
  }

  const filterInputField = () => {
    return (
      <ESInput className={classes.filterInputField} fullWidth placeholder="キーワード検索" value={filterByName} onChange={handleChange} />
    )
  }

  const memberList = useCallback(() => {
    return (
      <Box>
        <Box className={classes.newListHeaderContainer}>
          <Typography className={classes.newListHeader}>{t('streaming_setting_screen.member_list.new_list')}</Typography>
        </Box>
        <Box className={classes.listContainer}>
          {getData().map((item, index) => {
            return <MemberItem key={`MemberItem-${index}`} item={item} />
          })}
        </Box>
      </Box>
    )
  }, [getData(), filterByType, filterByName])

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
    '&:hover': {
      boxShadow: 'none',
      background: Colors.white,
    },
    padding: '3px 4px',
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
  [theme.breakpoints.down(1344)]: {
    filterButton: {
      marginRight: '8px',
      minWidth: 'unset',
    },
    addNewButtonText: {
      fontSize: '12px',
    },
    addNewButton: {
      padding: '4px 6px',
    },
  },
}))
export default MemberList
