import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { SetBattleRoyaleScoresParams } from '@services/arena.service'
import { clearMetaData } from '@store/metadata/actions'

const _setBattleRoyaleScores = createMetaSelector(actions.setBattleRoyaleScores)
const _setBattleRoyaleOwnScore = createMetaSelector(actions.setBattleRoyaleOwnScore)

const useBattleRoyaleScore = () => {
  const dispatch = useAppDispatch()

  const setBattleRoyaleScores = (params: SetBattleRoyaleScoresParams) => dispatch(actions.setBattleRoyaleScores(params))
  const setBattleRoyaleScoresMeta = useAppSelector(_setBattleRoyaleScores)
  const resetBattleRoyaleScoresMeta = () => dispatch(clearMetaData(actions.setBattleRoyaleScores.typePrefix))

  const setBattleRoyaleOwnScore = (params: SetBattleRoyaleScoresParams) => dispatch(actions.setBattleRoyaleOwnScore(params))
  const setBattleRoyaleOwnScoreMeta = useAppSelector(_setBattleRoyaleOwnScore)
  const resetBattleRoyaleOwnScoreMeta = () => dispatch(clearMetaData(actions.setBattleRoyaleOwnScore.typePrefix))

  return {
    setBattleRoyaleScores,
    setBattleRoyaleScoresMeta,
    resetBattleRoyaleScoresMeta,
    setBattleRoyaleOwnScore,
    setBattleRoyaleOwnScoreMeta,
    resetBattleRoyaleOwnScoreMeta,
  }
}

export default useBattleRoyaleScore
