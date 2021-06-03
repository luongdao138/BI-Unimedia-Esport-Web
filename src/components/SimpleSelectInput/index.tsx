import { Box, createStyles, makeStyles, Popper, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useRef } from 'react'
import SelectInputTextField from './SelectInputTextField'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { SuggestedTeamMembersResponse } from '@services/arena.service'
import ESLabel from '@components/Label'

interface SelectInputProps {
  label?: string
  index?: number
  selectedItem: SuggestedTeamMembersResponse
  items: SuggestedTeamMembersResponse[]
  onItemsSelected: (selectedItems: SuggestedTeamMembersResponse, index) => void
  onScrollEnd: () => void
}

const ESSimpleSelectInput: React.FC<SelectInputProps> = ({ label, index, selectedItem, items, onItemsSelected, onScrollEnd }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const textRef = useRef()

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
            <SelectInputTextField variant="outlined" {...params} inputRef={textRef} />
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
