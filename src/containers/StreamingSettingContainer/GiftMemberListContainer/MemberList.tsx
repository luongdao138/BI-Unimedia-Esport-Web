import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import ESButton from '@components/Button'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import MemberItem from '@containers/StreamingSettingContainer/GiftMemberListContainer/MemberItem'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useGiftTarget from '@containers/StreamingGiftManagement/useGiftTarget'
import { GiftMasterUserType } from '@services/gift.service'
import _ from 'lodash'
import { CellMeasurer, CellMeasurerCache, List, AutoSizer } from 'react-virtualized'
import { useRect } from '@utils/hooks/useRect'
import ESLoader from '@components/Loader/SmallLoader'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 95,
})

const contentRef = React.createRef<HTMLDivElement>()

const MemberList: React.FC = () => {
  const giftListRef = useRef<any>(null)
  const contentRect = useRect(contentRef)

  const router = useRouter()
  const { t } = useTranslation('common')
  const classes = useStyles()

  const { getAllGiftMaster, giftMasterList: giftMasterData, reloadGiftMasterFlag, metaGetAllGiftMaster } = useGiftTarget()

  const [filterByType, setFilterByType] = useState(GiftMasterUserType.NO_FILTER)
  const [filterByName, setFilterByName] = useState('')
  const [listKey, setListKey] = useState(0)
  const [giftMasterList, setGiftMasterList] = useState(giftMasterData)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getAllGiftMaster(filterByName, filterByType)
  }, [])

  useEffect(() => {
    if (metaGetAllGiftMaster?.pending) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [metaGetAllGiftMaster])

  useEffect(() => {
    if (reloadGiftMasterFlag) {
      getAllGiftMaster(filterByName, filterByType)
    }
  }, [reloadGiftMasterFlag])

  const getData = () => giftMasterList

  const onFilterButtonClick = (option) => () => {
    setFilterByType(option)
    inputDebounce(filterByName, option)
  }

  const FilterButton = ({ label, option }) => {
    const selected = option === filterByType
    return (
      <ESButton
        onClick={onFilterButtonClick(option)}
        className={`${classes.filterButton} ${selected ? '' : classes.filterButtonNonSelected}`}
      >
        {/* <Typography className={classes.filterButtonText}>{label}</Typography> */}
        {label}
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

  const filterButtonGroup = useMemo(() => {
    return (
      <Box className={classes.filterButtonGroupContainer}>
        <Box className={classes.filterBtnContainer}>
          <FilterButton label={t('streaming_setting_screen.member_list.filter_all')} option={GiftMasterUserType.NO_FILTER} />
          <FilterButton label={t('streaming_setting_screen.member_list.tag_team')} option={GiftMasterUserType.TEAM} />
          <FilterButton label={t('streaming_setting_screen.member_list.filter_individual')} option={GiftMasterUserType.INDIVIDUAL} />
        </Box>
        <Box className={classes.addBtnContainer}>
          <AddNewButton />
        </Box>
      </Box>
    )
  }, [filterByType])

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

  const noResultView = useMemo(() => {
    return (
      <Box className={classes.noResultView}>
        <Typography className={classes.noResultText}>{t('streaming_setting_screen.member_list.member_list_no_result')}</Typography>
      </Box>
    )
  }, [])

  useEffect(() => {
    cache.clearAll()
    setGiftMasterList(giftMasterData)
    setListKey((v) => v + 1)
  }, [giftMasterData])

  useEffect(() => {
    cache.clearAll()
  }, [contentRect?.width])

  const rowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer cache={cache} columnIndex={0} columnCount={1} key={key} parent={parent} rowIndex={index}>
        {({ registerChild }) => (
          <div key={key} style={style} ref={registerChild}>
            <MemberItem key={`MemberItem-${index}`} item={giftMasterList[index]} />
          </div>
        )}
      </CellMeasurer>
    )
  }

  const renderData = () => {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }} ref={contentRef}>
        <AutoSizer
          style={{ flex: 1 }}
          onResize={() => {
            cache.clearAll()
          }}
        >
          {({ height, width }) => (
            <List
              key={listKey}
              ref={giftListRef}
              overscanRowsCount={10}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={rowRenderer}
              rowCount={getData().length}
              className={classes.listGiftContainer}
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    )
  }

  const memberList = useMemo(() => {
    return (
      <Box style={{ paddingTop: '5px' }}>
        <Box className={classes.newListHeaderContainer}>
          <Typography className={classes.newListHeader}>{t('streaming_setting_screen.member_list.new_list')}</Typography>
        </Box>
        <Box className={classes.listContainer}>
          {isLoading && (
            <Box className={classes.loader}>
              <Box className={classes.loaderBox}>
                <ESLoader />
              </Box>
            </Box>
          )}
          {getData().length === 0 ? noResultView : renderData()}
        </Box>
      </Box>
    )
  }, [getData(), isLoading])

  return (
    <Box className={classes.container}>
      {filterButtonGroup}
      {filterInputField()}
      {memberList}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  filterButton: {
    backgroundColor: '#FFFFFF',
    minWidth: 'unset',
    // marginRight: '16px',
    '&:hover': {
      boxShadow: 'none',
      background: Colors.white,
    },
    padding: '4px 15px 3px 15px',
    color: '#212121',
    wordBreak: 'keep-all',
  },
  filterButtonNonSelected: {
    backgroundColor: '#747474',
  },
  filterButtonGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterBtnContainer: {
    display: 'flex',
    gap: '16px',
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
  noResultText: {
    fontSize: '12px',
    color: Colors.white,
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
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
    padding: '9px 12px 8px 12px',
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
    // overflow: 'scroll',
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
    position: 'relative',
  },
  listGiftContainer: {
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
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  loaderBox: {
    width: 20,
    height: 20,
    margin: '0 auto',
    top: '10px',
    position: 'relative',
    '& svg': {
      width: '100%',
      height: '100%',
    },
  },
  noResultView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  [theme.breakpoints.down(1344)]: {
    filterBtnContainer: {
      gap: '8px',
    },
    addNewButtonText: {
      fontSize: '12px',
    },
  },
  [theme.breakpoints.down(1175)]: {
    filterButtonGroupContainer: {
      flexDirection: 'column',
      rowGap: '18px',
    },
    addBtnContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    filterBtnContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      width: '100%',
      gap: '16px',
    },
    filterInputField: {
      marginTop: '34px',
    },
    newListHeaderContainer: {
      marginTop: '12px',
    },
    listContainer: {
      height: 'calc(100vh - 520px)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      padding: '24px',
    },
    addBtnContainer: {
      display: 'none',
    },
    filterBtnContainer: {
      display: 'flex',
    },
    filterInputField: {
      marginTop: '16px',
    },
  },
}))
export default MemberList
