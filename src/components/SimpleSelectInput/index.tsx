import { Box, CircularProgress, createStyles, makeStyles, Popper, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useCallback, useRef } from 'react'
import SelectInputTextField from './SelectInputTextField'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { SuggestedTeamMembersResponse } from '@services/tournament.service'
import ESLabel from '@components/Label'
import _ from 'lodash'

interface SelectInputProps {
  label?: string
  index?: number
  selectedItem: SuggestedTeamMembersResponse
  items: SuggestedTeamMembersResponse[]
  loading: boolean
  onSearchInput: (keyword: string) => void
  onItemsSelected: (selectedItems: SuggestedTeamMembersResponse, index) => void
  onScrollEnd: () => void
}

const ESSimpleSelectInput: React.FC<SelectInputProps> = ({
  label,
  index,
  selectedItem,
  items,
  loading,
  onSearchInput,
  onItemsSelected,
  onScrollEnd,
}) => {
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
    if (reason === 'input' || reason === 'clear') {
      inputDebounce(value)
    }
  }

  const PopperMy = function (props) {
    return (
      <Popper
        {...props}
        className={classes.root}
        style={{ width: 300, zIndex: 999 }}
        placement="bottom-start"
        anchorEl={textRef.current}
        disablePortal
      />
    )
  }

  return (
    <Box width={1}>
      <Autocomplete
        key={label}
        value={selectedItem}
        options={items}
        getOptionLabel={(item) => item.attributes.nickname}
        filterSelectedOptions
        noOptionsText={t('common:chat.no_user_available')}
        onChange={(_, values) => {
          onItemsSelected(values as SuggestedTeamMembersResponse, index)
        }}
        onInputChange={handleChange}
        loading={loading}
        getOptionSelected={(option, value) => option.id === value.id}
        renderOption={(item) => {
          return (
            <Box display="flex" overflow="hidden">
              <ESAvatar alt={item.attributes.nickname} src={item.attributes.avatar} />
              <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center">
                <Box color={Colors.black}>
                  <Typography variant="h3" noWrap>
                    {item.attributes.nickname}
                  </Typography>
                </Box>
                <Box color={Colors.black}>
                  <Typography variant="body2" noWrap>
                    {`${t('common:common.at')}${item.attributes.user_code}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        }}
        renderInput={(params) => (
          <Box>
            <ESLabel label={label} size="small" />
            <Box m={1} />
            <SelectInputTextField
              variant="outlined"
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
          </Box>
        )}
        PopperComponent={PopperMy}
        ListboxProps={{
          onScroll: (event: React.SyntheticEvent) => {
            const listboxNode = event.currentTarget
            if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
              onScrollEnd()
            }
          },
        }}
      />
    </Box>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiAutocomplete-listbox': {
        backgroundColor: theme.palette.common.white,
        border: `2px solid ${theme.palette.common.white}`,
        fontSize: 18,
        '& .MuiAutocomplete-option:hover': {
          backgroundColor: theme.palette.grey['200'],
        },
      },
    },
  })
)

export default ESSimpleSelectInput
