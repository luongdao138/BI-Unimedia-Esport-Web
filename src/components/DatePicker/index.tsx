import { DropdownDate } from './date-dropdown.component'
import { useTranslation } from 'react-i18next'

interface Props {
  selectedDate: { year: number; month: number; day: number }
  onDateChange: (date: { year: number; month: number; day: number }, error: boolean) => void
  hasError?: boolean
  helperText?: string
}

const ESDatePicker: React.FC<Props> = ({ selectedDate, onDateChange, hasError, helperText }) => {
  const { t } = useTranslation(['common'])
  return (
    <DropdownDate
      selectedDate={selectedDate}
      onDateChange={onDateChange}
      defaultValues={{ year: t('common:date.year'), month: t('common:date.month'), day: t('common:date.day') }}
      options={{ yearReverse: true }}
      hasError={hasError}
      helperText={helperText}
    />
  )
}

export default ESDatePicker
