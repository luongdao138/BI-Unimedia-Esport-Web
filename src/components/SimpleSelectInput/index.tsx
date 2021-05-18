import { Box, createStyles, makeStyles, Popper, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useRef } from 'react'
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
  label?: string
  required?: boolean
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
    required: {
      backgroundColor: Colors.primary,
      borderRadius: 2,
      paddingLeft: theme.spacing(1 / 2),
      paddingRight: theme.spacing(1 / 2),
      fontSize: 10,
      marginLeft: theme.spacing(1),
      color: Colors.white,
    },
  })
)

const ESSimpleSelectInput: React.FC<SelectInputProps> = ({ items, label, required, onItemsSelected }) => {
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
        renderInput={(params) => (
          <Box>
            <Box display="flex" alignItems="center">
              <Typography component="span">{label}</Typography>
              {required && (
                <Typography component="span" className={classes.required}>
                  {t('common:common.required')}
                </Typography>
              )}
            </Box>
            <SelectInputTextField variant="outlined" {...params} inputRef={textRef} />
          </Box>
        )}
        PopperComponent={PopperMy}
      />
    </Box>
  )
}

ESSimpleSelectInput.defaultProps = {
  required: false,
}

export default ESSimpleSelectInput
