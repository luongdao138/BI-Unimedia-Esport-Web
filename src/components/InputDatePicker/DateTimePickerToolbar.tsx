import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import ToolbarText from '@material-ui/pickers/_shared/ToolbarText'
import PickerToolbar from '@material-ui/pickers/_shared/PickerToolbar'
import ToolbarButton from '@material-ui/pickers/_shared/ToolbarButton'
import DateTimePickerTabs from '@material-ui/pickers/DateTimePicker/DateTimePickerTabs'
import { DateTimePickerView } from '@material-ui/pickers/DateTimePicker'
import { ToolbarComponentProps } from '@material-ui/pickers/Picker/Picker'
import { makeStyles, styled, useTheme } from '@material-ui/core/styles'
import { useUtils } from '@material-ui/pickers'
import { convertToMeridiem, getMeridiem } from '@material-ui/pickers/_helpers/time-utils'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import i18n from '@locales/i18n'

export const useStyles = makeStyles(
  (_) => ({
    toolbar: {
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around',
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default',
    },
  }),
  { name: 'MuiPickerDTToolbar' }
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useMeridiemMode(
  date: MaterialUiPickersDate,
  ampm: boolean | undefined,
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean | undefined) => void
) {
  const utils = useUtils()
  const meridiemMode = getMeridiem(date, utils)

  const handleMeridiemChange = React.useCallback(
    (mode: 'am' | 'pm') => {
      const timeWithMeridiem = convertToMeridiem(date, mode, Boolean(ampm), utils)
      onChange(timeWithMeridiem, false)
    },
    [ampm, date, onChange, utils]
  )

  return { meridiemMode, handleMeridiemChange }
}

const ToolbarDateTimeButton = styled(ToolbarButton)({
  '& .MuiTypography-h4': {
    fontSize: '1.5rem',
  },
})

export const DateTimePickerToolbar: React.FC<ToolbarComponentProps> = ({
  date,
  openView,
  setOpenView,
  ampm,
  hideTabs,
  dateRangeIcon,
  timeIcon,
  onChange,
}) => {
  const utils = useUtils()
  const classes = useStyles()
  const showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onChange)
  const theme = useTheme()
  const rtl = theme.direction === 'rtl'

  return (
    <>
      <PickerToolbar isLandscape={false} className={classes.toolbar}>
        <Grid container justify="center" wrap="nowrap">
          <Grid item container xs={5} justify="flex-start" direction="column">
            <div>
              <ToolbarButton
                variant="subtitle1"
                onClick={() => setOpenView('year')}
                selected={openView === 'year'}
                label={utils.getYearText(date)}
              />
            </div>
            <div>
              <ToolbarDateTimeButton
                variant="h4"
                onClick={() => setOpenView('date')}
                selected={openView === 'date'}
                label={utils.getDateTimePickerHeaderText(date) + i18n.t('common:common.day')}
              />
            </div>
          </Grid>

          <Grid item container xs={6} justify="center" alignItems="flex-end" direction={rtl ? 'row-reverse' : 'row'}>
            <ToolbarButton
              variant="h3"
              onClick={() => setOpenView('hours')}
              selected={openView === 'hours'}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              label={utils.getHourText(date, ampm!)}
            />

            <ToolbarText variant="h3" label=":" className={classes.separator} />

            <ToolbarButton
              variant="h3"
              onClick={() => setOpenView('minutes')}
              selected={openView === 'minutes'}
              label={utils.getMinuteText(date)}
            />
          </Grid>

          {ampm && (
            <Grid item container xs={1} direction="column" justify="flex-end">
              <ToolbarButton
                variant="subtitle1"
                selected={meridiemMode === 'am'}
                label={utils.getMeridiemText('am')}
                onClick={() => handleMeridiemChange('am')}
              />

              <ToolbarButton
                variant="subtitle1"
                selected={meridiemMode === 'pm'}
                label={utils.getMeridiemText('pm')}
                onClick={() => handleMeridiemChange('pm')}
              />
            </Grid>
          )}
        </Grid>
      </PickerToolbar>

      {showTabs && (
        <DateTimePickerTabs
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          view={openView as DateTimePickerView}
          onChange={setOpenView}
        />
      )}
    </>
  )
}
