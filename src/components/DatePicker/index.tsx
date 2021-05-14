import { DropdownDate } from './date-dropdown.component'
import { useTranslation } from 'react-i18next'

interface Props {
  selectedDate: string
  onDateChange: (date) => void
}

const ESDatePicker: React.FC<Props> = ({ selectedDate, onDateChange }) => {
  const { t } = useTranslation(['common'])
  return (
    <DropdownDate
      selectedDate={selectedDate}
      onDateChange={onDateChange}
      defaultValues={{ year: t('common:date.year'), month: t('common:date.month'), day: t('common:date.day') }}
      options={{ yearReverse: true }}
    />
  )
}

export default ESDatePicker
