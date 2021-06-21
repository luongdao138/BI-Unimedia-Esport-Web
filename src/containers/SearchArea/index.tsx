import { useState, useEffect } from 'react'
import { OutlinedInput, Box, Select, withStyles, IconButton, Icon } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@components/Button'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import useSearch from '@containers/Search/useSearch'

interface SearchAreaProps {
  selectData: dataItem[]
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
  const { searchType, searchKeyword } = useSearch()
  const { selectData, onSearch } = props
  const [hasValue, setHasvalue] = useState<boolean>(false)
  const [option, setOption] = useState<number>(1)
  const [value, setValue] = useState<string>('')
  const classes = useStyles()

  useEffect(() => {
    if (!_.isEmpty(value)) {
      setHasvalue(true)
    } else {
      setHasvalue(false)
    }
  }, [value])

  useEffect(() => {
    setOption(searchType)
    setValue(searchKeyword)
  }, [searchType, searchKeyword])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClear = () => {
    setHasvalue(false)
    setValue('')
  }

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(Number(e.target.value))
  }

  const handleSearch = () => {
    onSearch({
      value: value,
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

  return (
    <Box className={classes.searchCont}>
      <OutlinedInput
        onChange={onChange}
        placeholder={t('common:search.search_placeholder')}
        id={'search'}
        value={value}
        classes={{ root: classes.input }}
        margin="dense"
        endAdornment={renderIcon()}
      />
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

      <Button onClick={handleSearch} className={classes.searchBtn} variant="contained" color="primary">
        {t('common:search.search')}
      </Button>
    </Box>
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
    color: '#888',
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
      borderColor: '#fff',
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
    '&:hover &.Mui-focused .MuiOutlinedInput-notchedOutline': {
      zIndex: 100,
    },
  },
}))
export default SearchArea
