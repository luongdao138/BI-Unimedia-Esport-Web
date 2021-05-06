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
import ProfileAvatar from '@components/ProfileAvatar'
import ESAvatar from '@components/Avatar'

const Atoms: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [state, setState] = useState({
    checkedA: false,
  })

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
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
        <ESButton variant="contained" color="primary" size="large" round gradient>
          Primary
        </ESButton>
        <ESButton variant="contained" color="primary" size="large" round gradient disabled>
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
        <ESButton variant="contained" color="primary" size="large" round gradient>
          Primary
        </ESButton>
        <ESButton variant="contained" color="primary" size="large" round gradient disabled>
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
          endAdornment={
            <IconButton aria-label="back" size="small">
              <CloseIcon />
            </IconButton>
          }
        />
        <ESInput error helperText="エラー文言が入ります" />

        <ESSelect id="selectedValue" value={values.selectedValue} onChange={handleChange} label="Hello" required={true}>
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
          labelPrimary="メールアドレス1"
          labelSecondary={
            <Typography color="textPrimary" gutterBottom={false} variant="body2">
              メールアドレスがわからない場合
            </Typography>
          }
          fullWidth
        />

        <ESInput labelPrimary="メールアドレス2" value="qweqweq" disabled />
        <ESInput labelPrimary="メールアドレス3" required />

        <ESCheckbox checked={state.checkedA} onChange={handleChange1} label="end" name="checkedA" />
        <ESCheckbox />

        <PinInput numberOfPins={6} value={value} onChange={(value) => setValue(value)} />
      </Box>
      <Box>
        <ProfileAvatar src="/images/avatar.png" editable />
        <ProfileAvatar src="/images/avatar_o.png" />
      </Box>
      <Box display="flex" flexDirection="row">
        <ESAvatar stringValue="Avatar" src="/images/avatar.png" />
        <ESAvatar stringValue="Avatar" src="/images/avatar_o.png" />
        <ESAvatar stringValue="Avatar" />
        <ESAvatar stringValue="Bvatar" />
        <ESAvatar stringValue="Cvatar" />
        <ESAvatar stringValue="Dvatar" />
        <ESAvatar stringValue="Evatar" />
        <ESAvatar stringValue="Fvatar" />
        <ESAvatar stringValue="Gvatar" />
        <ESAvatar stringValue="Hvatar" />
        <ESAvatar stringValue="Ivatar" />
        <ESAvatar stringValue="Jvatar" />
        <ESAvatar stringValue="Kvatar" />
      </Box>
    </>
  )
}

export default Atoms
