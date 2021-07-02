import { useFormik } from 'formik'
import { Box, makeStyles } from '@material-ui/core'
import { CreateGameTitleParams, GameGenre, GameTitle } from '@services/game.service'
import Input from '@components/Input'
import Select from '@components/Select'
import Button from '@components/Button'
import Toast from '@components/Toast'
import * as Yup from 'yup'
import _ from 'lodash'
import useAddGame from './useAddGame'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '@locales/i18n'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { showDialog } from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'

interface Props {
  genres: GameGenre[]
  handleAdd: (game: GameTitle['attributes']) => void
}

const useStyles = makeStyles((theme) => ({
  button: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}))

const AddGame: React.FC<Props> = ({ genres, handleAdd }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { checkNgWord } = useCheckNgWord()
  const { createGame, meta, createdGame } = useAddGame()

  const validationSchema = Yup.object().shape({
    display_name: Yup.string().required(i18n.t('common:common.error')).max(60, i18n.t('common:common.too_long')),
    game_genre_id: Yup.number().test('game_genre_id', '', (value) => {
      return value !== -1
    }),
  })

  const formik = useFormik<CreateGameTitleParams>({
    initialValues: {
      display_name: '',
      game_genre_id: -1,
    },
    validationSchema,
    onSubmit(values) {
      if (_.isEmpty(checkNgWord(values.display_name))) {
        createGame(values)
      } else {
        dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.add_game }))
      }
    },
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    formik.validateForm()
  }, [])

  useEffect(() => {
    if (meta.loaded) {
      setOpen(true)
      formik.resetForm()
      handleAdd(createdGame)
    }
  }, [meta.loaded])

  const isInitial = formik.values.display_name === '' || formik.values.game_genre_id === -1

  return (
    <Box pt={4} px={5} className={classes.container}>
      <Toast open={open} message={t('profile.favorite_game.add_success')} onClose={() => setOpen(false)} />
      <form onSubmit={formik.handleSubmit}>
        <Select
          id="game_genre_id"
          name="game_genre_id"
          value={formik.values.game_genre_id}
          onChange={formik.handleChange}
          fullWidth
          required
          size="small"
          error={!!formik.errors.game_genre_id}
          label={t('profile.favorite_game.genre_label')}
        >
          <option disabled value={-1}>
            {t('please_select')}
          </option>
          {genres.map((g, idx) => (
            <option key={idx} value={g.attributes.id}>
              {g.attributes.name}
            </option>
          ))}
        </Select>
        <Box pb={4} />
        <Input
          id="display_name"
          name="display_name"
          value={formik.values.display_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          required
          size="small"
          helperText={formik.touched.display_name && formik.errors.display_name}
          error={formik.touched.display_name && !!formik.errors.display_name}
          labelPrimary={t('profile.favorite_game.title_label')}
        />
        <Box pb={4} />
        <Box textAlign="center">
          <Button
            variant="outlined"
            className={classes.button}
            type="submit"
            disabled={!_.isEmpty(formik.errors) || meta.pending || isInitial}
          >
            {t('profile.favorite_game.add_button')}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AddGame
