/* eslint-disable @typescript-eslint/no-empty-function */
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'

import ESButton from '@components/Button'
import ButtonPrimary from '@components/ButtonPrimary'
import ESChip from '@components/Chip'

const Atoms: React.FC = () => {
  const { t } = useTranslation(['common'])
  return (
    <Box>
      <Box margin={4}>
        <h2>{t('common:welcome')}</h2>
        <ButtonPrimary
          variant="contained"
          color="primary"
          round
          onClick={() => {
            alert('aaa')
          }}
        >
          保存する
        </ButtonPrimary>
        <ButtonPrimary
          variant="contained"
          color="primary"
          round
          gradient={false}
        >
          キャンセル
        </ButtonPrimary>
        <ButtonPrimary
          variant="contained"
          color="primary"
          size="small"
          round={false}
          gradient={false}
        >
          small
        </ButtonPrimary>
        <ButtonPrimary
          variant="contained"
          color="primary"
          size="large"
          round
          disabled
        >
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
    </Box>
  )
}

export default Atoms
