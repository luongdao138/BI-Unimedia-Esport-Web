import { useState, useEffect, useRef, useCallback } from 'react'
import { OutlinedInput, Select, withStyles, IconButton, Icon } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@components/Button'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import useSearch from '@containers/Search/useSearch'
import router from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { searchTypes } from '@constants/common.constants'
import FastSearchInput from '@containers/SearchArea/FastSearchInput'

interface SearchAreaProps {
  selectData: dataItem[]
  isLoggedIn: boolean
  userCode: string
  onSearch: (data: returnItem) => void
}

interface dataItem {
  value: number
  name: string
}

interface returnItem {
  value: string
  type: number
}

const SearchArea: React.FC<SearchAreaProps> = (props) => {
  const { t } = useTranslation(['common'])
  const { searchType, setSearch, searchKeyword } = useSearch()
  const { selectData, onSearch } = props
  const [hasValue, setHasvalue] = useState<boolean>(false)
  const [option, setOption] = useState<number>(1)
  // const [value, setValue] = useState<string>('')
  const searchTermRef = useRef<string>(searchKeyword)
  const inputRef = useRef<HTMLInputElement>(null)
  const classes = useStyles()

  const [clearFlag, setClearFlag] = useState<boolean>(false)

  const checkHaveValue = useCallback((value: string) => {
    setHasvalue(!_.isEmpty(value))
  }, [])

  // [CW] Determined if current route is video detail screen
  const isInVideoDetailPage = () => {
    if (router.pathname !== ESRoutes.TOP) {
      return false
    }
    const queryKey = 'vid'
    const video_id = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
    return !!video_id
  }

  useEffect(() => {
    // [CW] set default option of search area is video when current route is video detail screen
    if (router.pathname == ESRoutes.VIDEO_TOP || router.pathname == ESRoutes.SEARCH_VIDEO || isInVideoDetailPage()) {
      //[CW] only search video category
      setOption(searchTypes.VIDEO)
    } else {
      setOption(searchType)
    }
  }, [searchType])

  const onClear = () => {
    setHasvalue(false)
    inputRef?.current.focus()
    setClearFlag((prev) => !prev)
    // setValue('')
    setSearch({ type: searchType, keyword: '' })
  }

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(Number(e.target.value))
  }

  const handleSearch = (event) => {
    event.preventDefault()
    onSearch({
      value: searchTermRef.current,
      type: option,
    })
  }

  const renderIcon = () => {
    if (hasValue) {
      return (
        <IconButton onClick={onClear} aria-label="back" size="small" disableRipple>
          <Icon fontSize="small" className={classes.closeIcon + ' fa fa-times-circle'} />
        </IconButton>
      )
    } else {
      return null
    }
  }

  const renderSearchInput = () => {
    if (props.isLoggedIn) {
      return (
        // <OutlinedInput
        //   autoComplete="on"
        //   onChange={onChange}
        //   placeholder={t('common:search.search_placeholder')}
        //   id={`es_${props.userCode}`}
        //   name={`es_${props.userCode}`}
        //   value={value}
        //   classes={{ root: classes.input }}
        //   margin="dense"
        //   endAdornment={renderIcon()}
        // />
        <FastSearchInput
          autoComplete="on"
          placeholder={t('common:search.search_placeholder')}
          id={`es_${props.userCode}`}
          name={`es_${props.userCode}`}
          // value={value}
          classes={{ root: classes.input }}
          margin="dense"
          endAdornment={renderIcon()}
          valueRef={searchTermRef}
          checkHaveValue={checkHaveValue}
          clearFlag={clearFlag}
          inputRef={inputRef}
        />
      )
    } else {
      return (
        // <OutlinedInput
        //   autoComplete={'off'}
        //   onChange={onChange}
        //   placeholder={t('common:search.search_placeholder')}
        //   id={'search'}
        //   name="search"
        //   value={value}
        //   classes={{ root: classes.input }}
        //   margin="dense"
        //   endAdornment={renderIcon()}
        // />
        <FastSearchInput
          autoComplete={'off'}
          placeholder={t('common:search.search_placeholder')}
          id={'search'}
          checkHaveValue={checkHaveValue}
          name="search"
          // value={value}
          classes={{ root: classes.input }}
          valueRef={searchTermRef}
          margin="dense"
          endAdornment={renderIcon()}
          clearFlag={clearFlag}
          inputRef={inputRef}
        />
      )
    }
  }

  return (
    <form onSubmit={handleSearch} className={classes.searchCont}>
      {renderSearchInput()}
      <Select
        id={'input'}
        variant="outlined"
        margin="dense"
        native
        onChange={onSelect}
        value={option}
        className={classes.select}
        input={<Input />}
      >
        {selectData &&
          selectData.map(({ value, name }: dataItem, index) => (
            <option key={index + value} value={value}>
              {name}
            </option>
          ))}
      </Select>

      <Button type="submit" className={classes.searchBtn} variant="contained" color="primary">
        {t('common:search.search')}
      </Button>
    </form>
  )
}

const Input = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: Colors.black,
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: 1,
        borderColor: Colors.white,
      },
    },
  })
)(OutlinedInput)

const useStyles = makeStyles(() => ({
  searchBtn: {
    fontWeight: 400,
    height: 37.6,
    borderBottomLeftRadius: 'unset',
    borderTopLeftRadius: 'unset',
    '& > .MuiButton-label': {
      minWidth: 60,
    },
  },
  closeIcon: {
    color: '#888888',
  },
  inputFocused: { width: 0, opacity: 0, visibility: 'hidden' },
  inputBlur: { width: 170, opacity: 1, visibility: 'visible' },
  input: {
    borderBottomRightRadius: 'unset',
    zIndex: 11,
    width: '100%',
    borderTopRightRadius: 'unset',
    backgroundColor: Colors.black,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: '#FFFFFF',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
  },
  searchCont: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    width: 500,
  },
  select: {
    minWidth: 170,
    borderBottomLeftRadius: 'unset',
    borderTopLeftRadius: 'unset',
    borderTopRightRadius: 'unset',
    borderBottomRightRadius: 'unset',
    marginLeft: '-1px',
    fontSize: 14,
    transition: 'all 0.1s ease-out',
    willChange: 'width',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { zIndex: 100 },
    '&:hover': { zIndex: 100 },
  },
}))
export default SearchArea
