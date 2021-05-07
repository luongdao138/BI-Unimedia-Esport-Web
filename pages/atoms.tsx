/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography, Icon } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import ESButton from '@components/Button'
import ButtonPrimary from '@components/ButtonPrimary'
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
import ESSlider from '@components/Slider'
import ESInput from '@components/Input'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import { useFormik } from 'formik'
import PinInput from '@components/PinInput'
import ProfileAvatar from '@components/ProfileAvatar'
import ProfileCover from '@components/ProfileCover'
import ESAvatar from '@components/Avatar'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import Stepper from '@components/Stepper'
import Step from '@components/Step'
import StepLabel from '@components/StepLabel'
import StepButton from '@components/StepButton'
import ESStrengthMeter from '@components/StrengthMeter'
import ESLoader from '@components/Loader'
import MainLayout from '@layout/MainLayout'

const Atoms = () => {
  const [value, setValue] = useState<string>('')
  const [tab, setTab] = useState(0)
  const [state, setState] = useState({
    checkedA: false,
  })
  const [step, setStep] = useState(2)

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
        <ButtonPrimary
          round
          onClick={() => {
            alert('aaa')
          }}
        >
          保存する
        </ButtonPrimary>
        <ButtonPrimary round gradient={false}>
          キャンセル
        </ButtonPrimary>
        <ButtonPrimary size="small" round={false} gradient={false}>
          small test
        </ButtonPrimary>
        <ButtonPrimary size="large" round disabled>
          Disabled
        </ButtonPrimary>

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
      <Box margin={4}>
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
      <Box margin={4}>
        <ESChip label="マインクラフト" onDelete={() => {}} />
        <ESChip label="マインクラフト" onClick={() => {}} color="primary" />
        <ESChip label="マインクラフト" onClick={() => {}} />
      </Box>
      <Box margin={4}>
        <ESLoader></ESLoader>
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
            <ESCardMedia image="https://picsum.photos/id/237/240/120"></ESCardMedia>
            <ESCardContent>
              <Typography>募集名が入ります。</Typography>
            </ESCardContent>
          </ESCard>
          <ESCard>
            <ESCardMedia
              cornerIcon={<Icon className="fas fa-university" fontSize="small" />}
              image="https://picsum.photos/id/412/240/120"
            ></ESCardMedia>
            <ESCardContent>
              <Typography>募集名が入ります。</Typography>
            </ESCardContent>
          </ESCard>
          <ESCard>
            <ESCardMedia
              cornerIcon={<Icon className="fas fa-trophy" fontSize="small" />}
              image="https://picsum.photos/id/112/240/120"
            ></ESCardMedia>
            <ESCardContent>
              <Typography>募集名が入ります。</Typography>
            </ESCardContent>
          </ESCard>
          <ESCard>
            <ESCardMedia
              cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
              image="https://picsum.photos/id/112/240/120"
            ></ESCardMedia>
            <ESCardContent>
              <Typography>募集名が入ります。</Typography>
            </ESCardContent>
          </ESCard>
        </Grid>
      </Box>
      <Box margin={4}>
        <ESSlider
          navigation
          items={[
            <ESCard key="1">
              <ESCardMedia
                cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
                image="https://picsum.photos/id/412/240/120"
              ></ESCardMedia>
              <ESCardContent>
                <Typography>募集名が入ります。</Typography>
              </ESCardContent>
            </ESCard>,
            <ESButtonApple key="2" variant="contained" fullWidth />,
            <Typography key="3">募集名が入ります1。</Typography>,
            <Typography key="4">募集名が入ります2。</Typography>,
          ]}
        />
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
      <Box position="relative" height={300} pt={23} pl={4} margin={4}>
        <ProfileCover src="/images/avatar.png" />
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
        <ESAvatar alt="高atar" />
      </Box>
      <Box margin={4}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)}>
          <ESTab label="Item One" value={0} />
          <ESTab label="Item Two" value={1} />
          <ESTab label="Item Three" value={2} />
        </ESTabs>
      </Box>
      <Box margin={4}>
        <Stepper activeStep={step}>
          {['基本データ', 'タグ', '好きなゲーム'].map((label, idx) => (
            <Step key={idx}>
              <StepButton disableRipple onClick={() => setStep(idx)}>
                <StepLabel>{label}</StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
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

Atoms.Layout = MainLayout

export default Atoms
