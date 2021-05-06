/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography } from '@material-ui/core'
import { AccountBalance, Close as CloseIcon } from '@material-ui/icons'
import ESButton from '@components/Button'
import ESButtonTwitter from '@components/Button/Twitter'
import ESButtonGoogle from '@components/Button/Google'
import ESButtonLine from '@components/Button/Line'
import ESButtonFacebook from '@components/Button/Facebook'
import ESButtonApple from '@components/Button/Apple'
import ESButtonFacebookCircle from '@components/Button/FacebookCircle'
import ESButtonTwitterCircle from '@components/Button/TwitchCircle'
import ESButtonTwitchCircle from '@components/Button/TwitterCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import ESButtonLineCircle from '@components/Button/LineCircle'
import ESButtonGoogleCircle from '@components/Button/GoogleCircle'
import ESButtonAppleCircle from '@components/Button/AppleCircle'
import ESChip from '@components/Chip'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import ESInput from '@components/Input'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import { useFormik } from 'formik'
import PinInput from '@components/PinInput'
import ProfileAvatar from '@components/ProfileAvatar'
import ESAvatar from '@components/Avatar'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import ESStrengthMeter from '@components/StrengthMeter'

const Atoms: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [tab, setTab] = useState(0)
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
        {/* <h2>{t('')}</h2> */}
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
        <ESButtonTwitter variant="contained" fullWidth />
        <ESButtonTwitter variant="contained" fullWidth disabled />
        <ESButtonGoogle variant="contained" fullWidth />
        <ESButtonLine variant="contained" fullWidth />
        <ESButtonFacebook variant="contained" fullWidth />
        <ESButtonApple variant="contained" fullWidth />
      </Box>
      <Box margin={2} display="flex">
        <ESButtonFacebookCircle />
        <ESButtonTwitterCircle />
        <ESButtonTwitchCircle />
        <ESButtonInstagramCircle />
        <ESButtonLineCircle />
        <ESButtonGoogleCircle />
        <ESButtonAppleCircle />
      </Box>
      <Box margin={4}>
        <Grid xs={3}>
          <ESCard>
            <ESCardMedia imageUrl="https://picsum.photos/id/237/240/120"></ESCardMedia>
            <ESCardContent>
              <Typography>募集名が入ります。</Typography>
            </ESCardContent>
          </ESCard>
          <ESCard>
            <ESCardMedia cornerIcon={<AccountBalance fontSize="small" />} imageUrl="https://picsum.photos/id/412/240/120"></ESCardMedia>
            <ESCardContent>
              <Typography>募集名が入ります。</Typography>
            </ESCardContent>
          </ESCard>
        </Grid>
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
      <Box margin={4}>
        <ProfileAvatar src="/images/avatar.png" editable />
        <ProfileAvatar src="/images/avatar_o.png" />
      </Box>
      <Box margin={4} display="flex" flexDirection="row">
        <ESAvatar alt="Avatar" src="/images/avatar.png" />
        <ESAvatar alt="Avatar" src="/images/avatar_o.png" />
        <ESAvatar alt="Avatar" />
        <ESAvatar alt="Bvatar" />
        <ESAvatar alt="Cvatar" />
        <ESAvatar alt="Dvatar" />
        <ESAvatar alt="Evatar" />
        <ESAvatar alt="Fvatar" />
        <ESAvatar alt="Gvatar" />
        <ESAvatar alt="Hvatar" />
        <ESAvatar alt="Ivatar" />
        <ESAvatar alt="Jvatar" />
        <ESAvatar alt="Kvatar" />
        <ESAvatar alt="あvatar" />
        <ESAvatar alt="いvatar" />
        <ESAvatar alt="おvatar" />
        <ESAvatar alt="うvatar" />
        <ESAvatar alt="えvatar" />
        <ESAvatar alt="高atar" />
      </Box>
      <Box margin={4}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)}>
          <ESTab label="Item One" value={0} />
          <ESTab label="Item Two" value={1} />
          <ESTab label="Item Three" value={2} />
        </ESTabs>
      </Box>
      <Box margin={2}>
        <ESStrengthMeter value={33} />
      </Box>
      <Box margin={2}>
        <ESStrengthMeter value={50} />
      </Box>
      <Box margin={2}>
        <ESStrengthMeter value={66} />
      </Box>
      <Box margin={2}>
        <ESStrengthMeter value={85} />
      </Box>
      <Box margin={2}>
        <ESStrengthMeter value={100} />
      </Box>
    </>
  )
}

export default Atoms
