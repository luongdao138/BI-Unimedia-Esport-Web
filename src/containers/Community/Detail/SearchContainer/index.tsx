import i18n from '@locales/i18n'
import { Box, IconButton, OutlinedInput, Icon, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ESCheckbox from '@components/Checkbox'

const InfoContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  // TODO change useSearch when data is ready
  const [hasValue, setHasvalue] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const classes = useStyles()

  useEffect(() => {
    if (!_.isEmpty(value)) {
      setHasvalue(true)
    } else {
      setHasvalue(false)
    }
  }, [value])

  const handleCheckbox = () => {
    //
  }

  const handleSearch = (event) => {
    event.preventDefault()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClear = () => {
    setHasvalue(false)
    setValue('')
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
    <>
      <Box mt={2}>
        <form onSubmit={handleSearch} className={classes.searchContainer}>
          <OutlinedInput
            autoComplete="off"
            onChange={onChange}
            placeholder={t('common:search.search_placeholder')}
            id={'search'}
            value={value}
            classes={{ root: classes.input }}
            margin="dense"
            endAdornment={renderIcon()}
          />

          <Button
            onClick={handleSearch}
            className={classes.searchBtn}
            variant="outlined"
            startIcon={<Icon fontSize="small" className={`fa fa-search ${classes.icon}`} />}
          ></Button>
        </form>
      </Box>

      <Box pb={4}>
        <ESCheckbox disableRipple onChange={handleCheckbox} label={i18n.t('common:community.search_by_title')} />
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  searchBtn: {
    fontWeight: 400,
    height: 37.6,
    minWidth: 45,
    backgroundColor: Colors.black,
    borderBottomLeftRadius: 'unset',
    borderTopLeftRadius: 'unset',
    '& > .MuiButton-label': {
      minWidth: 20,
    },
    padding: `${theme.spacing(0.75)}px 0`,
  },
  icon: {
    paddingLeft: theme.spacing(0.75),
  },
  closeIcon: {
    color: '#888',
  },
  input: {
    zIndex: 11,
    width: '100%',
    borderBottomRightRadius: 'unset',
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
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    width: 500,
  },
}))

export default InfoContainer
