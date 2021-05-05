/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import ESButton from '@components/Button'
import ESChip from '@components/Chip'
import ESInput from '@components/Input'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import { useFormik } from 'formik'
import PinInput from '@components/PinInput'

const Atoms: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const { t } = useTranslation(['common'])

  const { handleChange, values } = useFormik({
    initialValues: {
      selectedValue: '',
    },
    onSubmit: (values) => {
      values
      value
    },
  })

  const items = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
  ]

  return (
    <>
      <Box margin={4}>
        <h2>{t('common:welcome')}</h2>
        <ESButton
          variant="contained"
          color="primary"
          size="large"
          round
          gradient
        >
          Primary
        </ESButton>
        <ESButton
          variant="contained"
          color="primary"
          size="large"
          round
          gradient
          disabled
        >
          Disabled
        </ESButton>
        <ESButton variant="contained" color="primary">
          Primary
        </ESButton>
        <ESButton variant="contained" color="primary" disabled>
          Disabled
        </ESButton>
        <ESButton variant="outlined" round>
          Outlined
        </ESButton>
        <ESButton variant="outlined" round disabled>
          disabled
        </ESButton>
        <ESButton variant="outlined">Outlined</ESButton>
        <ESButton variant="outlined" disabled>
          disabled
        </ESButton>
      </Box>
      <Box>
        <Typography variant="h2" gutterBottom>
          h2 画面タイトルは18px boldで表記します
        </Typography>
        <Typography variant="h3" gutterBottom>
          H3 セクションタイトルは16px boldで表記します
        </Typography>
        <Typography>本文テキストは14pxで表記します</Typography>
        <Typography gutterBottom color="textSecondary">
          プレースホルダーや検索結果がない時など、操作できないものはこの色
        </Typography>
        <Typography variant="caption" gutterBottom>
          ※注釈などのテキストは12pxで表記します
        </Typography>
      </Box>
      <Box>
        <ESChip label="マインクラフト" onDelete={() => {}} />
        <ESChip label="マインクラフト" onClick={() => {}} color="primary" />
        <ESChip label="マインクラフト" onClick={() => {}} />
      </Box>
      <Box margin={4}>
        <h2>{t('common:welcome')}</h2>
        <ESButton
          variant="contained"
          color="primary"
          size="large"
          round
          gradient
        >
          Primary
        </ESButton>
        <ESButton
          variant="contained"
          color="primary"
          size="large"
          round
          gradient
          disabled
        >
          Disabled
        </ESButton>
        <ESButton variant="contained" color="primary">
          Primary
        </ESButton>
        <ESButton variant="contained" color="primary" disabled>
          Disabled
        </ESButton>
        <ESButton variant="outlined" round>
          Outlined
        </ESButton>
        <ESButton variant="outlined" round disabled>
          disabled
        </ESButton>
        <ESButton variant="outlined">Outlined</ESButton>
        <ESButton variant="outlined" disabled>
          disabled
        </ESButton>
        <ESInput placeholder="キーワード検索" />
        <ESInput
          value="入力中"
          endAdornment={
            <IconButton aria-label="back" size="small">
              <CloseIcon />
            </IconButton>
          }
        />
        <ESInput error helperText="エラー文言が入ります" value="エラー" />

        <ESSelect
          id="selectedValue"
          value={values.selectedValue}
          onChange={handleChange}
          label="Hello"
          required={true}
        >
          <option value="" disabled>
            プルダウン
          </option>
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </ESSelect>

        <ESInput
          placeholder="キーワード検索"
          labelPrimary="メールアドレス"
          labelSecondary={
            <Typography color="textPrimary" gutterBottom variant="body2">
              メールアドレスがわからない場合
            </Typography>
          }
          fullWidth
        />

        <ESInput labelPrimary="メールアドレス" value="qweqweq" disabled />
        <ESInput labelPrimary="メールアドレス" required />

        <ESCheckbox />
        <ESCheckbox />

        <PinInput numberOfPins={6} getValue={(value) => setValue(value)} />
      </Box>
    </>
  )
}

export default Atoms
