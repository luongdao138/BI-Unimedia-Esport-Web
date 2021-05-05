/* eslint-disable @typescript-eslint/no-empty-function */
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import { Box, Grid } from '@material-ui/core'
import { AccountBalance } from '@material-ui/icons'

import ESButton from '@components/Button'
import ESButtonTwitter from '@components/Button/Twitter'
import ESButtonGoogle from '@components/Button/Google'
import ESButtonLine from '@components/Button/Line'
import ESButtonFacebook from '@components/Button/Facebook'
import ESButtonApple from '@components/Button/Apple'
import ESButtonFacebookCircle from '@components/Button/FacebookCircle'
import ESChip from '@components/Chip'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'

const Atoms: React.FC = () => {
  const { t } = useTranslation(['common'])
  return (
    <Box>
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
        <ESButtonTwitter variant="contained" fullWidth />
        <ESButtonTwitter variant="contained" fullWidth disabled />
        <ESButtonGoogle variant="contained" fullWidth />
        <ESButtonLine variant="contained" fullWidth />
        <ESButtonFacebook variant="contained" fullWidth />
        <ESButtonApple variant="contained" fullWidth />
      </Box>
      <Box margin={4}>
        <ESButtonFacebookCircle />
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
            <ESCardMedia
              cornerIcon={<AccountBalance fontSize="small" />}
              imageUrl="https://picsum.photos/id/412/240/120"
            ></ESCardMedia>
            <ESCardContent>
              <Typography>募集名が入ります。</Typography>
            </ESCardContent>
          </ESCard>
        </Grid>
      </Box>
    </Box>
  )
}

export default Atoms
