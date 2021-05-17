import { Box, createStyles, makeStyles, Popper, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useRef } from 'react'
import ESChip from '@components/Chip'
import SelectInputTextField from './SelectInputTextField'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

type SelectInputItem = {
  id: number
  nickname: string
  avatar: string
  user_code: string
}

interface SelectInputProps {
  items: SelectInputItem[]
  onItemsSelected: (selectedItems) => void
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

const ESSelectInput: React.FC<SelectInputProps> = ({ items, onItemsSelected }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const textRef = useRef()

  const PopperMy = function (props) {
    return <Popper {...props} className={classes.root} style={{ width: 300 }} placement="bottom-start" anchorEl={textRef.current} />
  }

  return (
    <Box width={1}>
      <Autocomplete
        multiple
        limitTags={2}
        options={items}
        getOptionLabel={(option) => option.nickname}
        filterSelectedOptions
        noOptionsText={t('common:chat.no_user_available')}
        onChange={(_, values) => onItemsSelected(values)}
        renderOption={(item) => {
          return (
            <Box display="flex" overflow="hidden">
              <ESAvatar alt={item.nickname} src={item.avatar} />
              <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center">
                <Box color={Colors.black}>
                  <Typography variant="h3" noWrap>
                    {item.nickname}
                  </Typography>
                </Box>
                <Box color={Colors.black}>
                  <Typography variant="body2" noWrap>
                    {`${t('common.at')}${item.user_code}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        }}
        renderInput={(params) => <SelectInputTextField {...params} inputRef={textRef} />}
        renderTags={(value, getTagProps) =>
          value.map((item, index) => <ESChip key={index} label={item.nickname} {...getTagProps({ index })} />)
        }
        PopperComponent={PopperMy}
      />
    </Box>
  )
}

export default ESSelectInput
