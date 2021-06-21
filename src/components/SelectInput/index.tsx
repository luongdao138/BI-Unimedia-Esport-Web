import { Box, createStyles, makeStyles, Popper, Typography, CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useCallback, useRef } from 'react'
import ESChip from '@components/Chip'
import SelectInputTextField from './SelectInputTextField'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

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
      '& .MuiAutocomplete-listbox': {
        backgroundColor: theme.palette.common.white,
        border: `0 none`,
        padding: 0,
        margin: 0,
        fontSize: 18,
        '& .MuiAutocomplete-option:hover': {
          backgroundColor: theme.palette.grey['200'],
        },
      },
    },
    chip: {
      display: 'flex',
      '& .MuiChip-label': {
        maxWidth: 140,
      },
    },
    autocomplete: {
      margin: 0,
      padding: 0,
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

  const PopperMy = function (props) {
    return <Popper {...props} className={classes.root} style={{ width: 300 }} placement="bottom-start" anchorEl={textRef.current} />
  }

  const handleChange = (_event, value: string, reason: string) => {
    if (reason === 'input') {
      inputDebounce(value)
    }
  }

  return (
    <Box width={1}>
      <Autocomplete
        multiple
        limitTags={2}
        options={items}
        getOptionLabel={(option) => option.nickName}
        filterSelectedOptions
        className={classes.autocomplete}
        noOptionsText={t('common:chat.no_user_available')}
        disableClearable
        onInputChange={handleChange}
        onChange={(_, values) => onItemsSelected(values)}
        onOpen={(_) => onSearchInput('')}
        loading={loading}
        getOptionSelected={(option, value) => option.id === value.id}
        renderOption={(item) => {
          return (
            <Box display="flex" overflow="hidden">
              <ESAvatar alt={item.nickName} src={item.avatar} />
              <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center">
                <Box color={Colors.black}>
                  <Typography variant="h3" noWrap>
                    {item.nickName}
                  </Typography>
                </Box>
                <Box color={Colors.black}>
                  <Typography variant="body2" noWrap>
                    {`${t('common:common.at')}${item.userCode}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        }}
        renderInput={(params) => (
          <SelectInputTextField
            {...params}
            inputRef={textRef}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((item, index) => (
            <ESChip
              size="small"
              className={classes.chip}
              key={index}
              label={<EllipsisText>{item.nickName}</EllipsisText>}
              {...getTagProps({ index })}
            />
          ))
        }
        PopperComponent={PopperMy}
      />
    </Box>
  )
}

export default ESSelectInput

const CHIP_MAX_WIDTH = 250
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
