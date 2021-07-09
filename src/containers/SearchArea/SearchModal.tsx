import { useState, useEffect } from 'react'
import { OutlinedInput, Box, Select, withStyles, IconButton, Icon, Dialog } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@components/Button'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import useSearch from '@containers/Search/useSearch'

interface SearchModalProps {
  show: boolean
  handleClose: () => void
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

const SearchModal: React.FC<SearchModalProps> = ({ show, selectData, onSearch, handleClose }) => {
  const { t } = useTranslation(['common'])
  const { searchType, searchKeyword } = useSearch()
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
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
      document.body.style.height = 'unset'
    }
  }, [])

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
    handleClose()
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
    <Dialog
      fullScreen
      aria-labelledby="modal"
      open={show}
      className={classes.root}
      onClose={handleClose}
      BackdropProps={{ classes: { root: classes.bg } }}
      PaperProps={{ classes: { root: classes.bg } }}
      onEntered={() => {
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.height = '100%'
      }}
      onExited={() => {
        document.body.style.position = 'unset'
        document.body.style.width = 'unset'
        document.body.style.height = 'unset'
      }}
    >
      <Box pt={2} paddingX={2} display="flex" flexDirection="column">
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

        <OutlinedInput
          onChange={onChange}
          placeholder={t('common:search.search_placeholder')}
          id={'search'}
          value={value}
          classes={{ root: classes.input }}
          margin="dense"
          endAdornment={renderIcon()}
        />

        <Button onClick={handleSearch} className={classes.searchBtn} variant="contained" color="primary">
          {t('common:search.search')}
        </Button>
      </Box>
    </Dialog>
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
  root: {
    backgroundColor: Colors.grey[100],
    marginTop: 60,
    background: `url("/images/pattern.png") center 60px repeat-x ${Colors.grey[100]} fixed`,
    height: '100%',
  },
  searchBtn: {
    fontWeight: 400,
    height: 37.6,
    marginTop: 24,
    width: 104,
    alignSelf: 'center',
  },
  bg: {
    backgroundColor: 'transparent',
  },
  closeIcon: {
    color: '#888',
  },
  inputFocused: { width: 0, opacity: 0, visibility: 'hidden' },
  inputBlur: { width: 170, opacity: 1, visibility: 'visible' },
  input: {
    marginTop: 8,
    width: '100%',
    backgroundColor: Colors.black,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: Colors.white,
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
      WebkitBoxShadow: `0 0 0 100px ${Colors.black} inset`,
    },
  },
  select: {
    width: '50%',
    fontSize: 14,
    transition: 'all 0.1s ease-out',
    willChange: 'width',
  },
}))

export default SearchModal
