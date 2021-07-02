import { Box, createStyles, makeStyles, Typography, CircularProgress } from '@material-ui/core'
import { useCallback, useRef } from 'react'
import ESChip from '@components/Chip'
import SelectInputTextField from './SelectInputTextField'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import useAutocomplete from '@material-ui/lab/useAutocomplete'
import NoSsr from '@material-ui/core/NoSsr'

export type SelectInputItem = {
  id: number
  nickName: string
  avatar: string
  userCode: string
}

interface SelectInputProps {
  items: SelectInputItem[]
  onItemsSelected: (selectedItems: (string | SelectInputItem)[]) => void
  onSearchInput: (keyword: string) => void
  loading: boolean
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 10,
      '& .MuiAutocomplete-listbox': {
        backgroundColor: theme.palette.common.white,
        border: `0 none`,
        zIndex: 1000,
        margin: 0,
        fontSize: 18,
        '& .MuiAutocomplete-option:hover': {
          backgroundColor: theme.palette.grey['200'],
        },
      },
    },
    chip: {
      display: 'flex',
      margin: '2px 2px',
      height: '30px',
      padding: '0 4px',
      '& .MuiChip-label': {
        maxWidth: 140,
      },
    },
    autocomplete: {
      margin: 0,
      padding: '0 !important',
    },

    listBox: {
      width: '300px',
      margin: '10px 0 0',
      padding: '0',
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: '#fff',
      overflow: 'auto',
      maxHeight: '250px',
      borderRadius: '3px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      zIndex: 1,
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
        backgroundColor: '#222',
        borderRadius: 6,
      },
      '& li': {
        padding: '5px 12px',
        display: 'flex',
        '& span': { flexGrow: 1 },
        '& svg': { color: 'transparent' },
      },
      "& li[aria-selected='true']": {
        backgroundColor: '#fafafa',
        fontWeight: 600,
        '& svg': { color: '#1890ff' },
      },
      "& li[data-focus='true']": {
        backgroundColor: '#e6f7ff',
        cursor: 'pointer',
        '& svg': { color: '#000' },
      },
    },
    listItem: {
      padding: 4,
      cursor: 'pointer',
      '&:hover': {
        background: '#eee',
      },
    },
    inputWrapper: {
      maxHeight: 104,
      width: '100%',
      display: 'flex',
      padding: 4,
      outline: '0 none',
      flexWrap: 'wrap',
      overflow: 'overlay',
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
        backgroundColor: '#222',
        borderRadius: 6,
      },
      '&.focused': {
        background: '#111',
      },
      '& input': {
        fontSize: '14px',
        height: '26px',
        marginTop: '4px',
        boxSizing: 'border-box',
        padding: '8px 6px',
        width: '0',
        minWidth: '30px',
        flexGrow: 1,
        border: '0',
        margin: '0',
        outline: '0',
      },
    },

    [theme.breakpoints.down('sm')]: {
      listBox: {
        width: '240px',
      },
      loader: {
        display: 'none',
      },
    },
  })
)

const ESSelectInput: React.FC<SelectInputProps> = ({ items, onItemsSelected, onSearchInput, loading }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const textRef = useRef()
  const inputDebounce = useCallback(
    _.debounce((keyword: string) => {
      onSearchInput(keyword)
    }, 500),
    []
  )

  const handleChange = (_event, value: string, reason: string) => {
    if (reason === 'input') {
      inputDebounce(value)
    }
  }

  const { getRootProps, getInputProps, getTagProps, getListboxProps, getOptionProps, groupedOptions, value, focused } = useAutocomplete({
    multiple: true,
    options: items,
    getOptionLabel: (option) => option.nickName,
    onChange: (_, values) => onItemsSelected(values),
    getOptionSelected: (option, value) => option.id === value.id,
    onInputChange: handleChange,
  })

  return (
    <Box width={1}>
      <NoSsr>
        <div>
          <div {...getRootProps()}>
            <Box className={`${focused ? 'focused' : ''} ${classes.inputWrapper}`}>
              {value.map((option: SelectInputItem, index: number) => (
                <ESChip
                  size="small"
                  className={classes.chip}
                  key={index}
                  label={<EllipsisText>{option.nickName}</EllipsisText>}
                  {...getTagProps({ index })}
                />
              ))}
              <SelectInputTextField
                {...getInputProps()}
                inputRef={textRef}
                className={classes.input}
                InputProps={{
                  ...getInputProps(),
                  endAdornment: <>{loading ? <CircularProgress className={classes.loader} color="inherit" size={20} /> : null}</>,
                }}
              />
            </Box>
          </div>
          {groupedOptions.length > 0 ? (
            <Box className={classes.listBox} {...getListboxProps()}>
              {groupedOptions.map((option, index) => {
                const isSelected = getOptionProps({ option, index })['aria-selected']
                if (!isSelected)
                  return (
                    <Box className={classes.listItem} display="flex" overflow="hidden" key={index} {...getOptionProps({ option, index })}>
                      <ESAvatar alt={option.nickName} src={option.avatar} />
                      <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center">
                        <Box color={Colors.black}>
                          <Typography variant="h3" noWrap>
                            {option.nickName}
                          </Typography>
                        </Box>
                        <Box color={Colors.black}>
                          <Typography variant="body2" noWrap>
                            {`${t('common:common.at')}${option.userCode}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )
              })}
            </Box>
          ) : null}
        </div>
      </NoSsr>
    </Box>
  )
}

export default ESSelectInput

const CHIP_MAX_WIDTH = 120
const CHIP_ICON_WIDTH = 30

const EllipsisText = (props) => {
  const { children } = props

  return (
    <div
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: CHIP_MAX_WIDTH - CHIP_ICON_WIDTH,
      }}
    >
      {children}
    </div>
  )
}
