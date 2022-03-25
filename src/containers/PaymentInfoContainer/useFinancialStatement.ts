import { FinancialStatementData, FinancialStatementParams } from '@services/financial.service'
import financial from '@store/financial'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = financial
const _fetchFinancialStatement = createMetaSelector(actions.fetchFinancialStatement)

const useFinancialStatement = (): {
  meta_financial_statement: Meta
  fetchFinancialStatement(params: FinancialStatementParams): void
  financialStatementData: FinancialStatementData
} => {
  const dispatch = useAppDispatch()

  const financialStatementData = useAppSelector(selectors.financialStatementData)

  const meta_financial_statement = useAppSelector(_fetchFinancialStatement)

  const fetchFinancialStatement = (params: FinancialStatementParams) => dispatch(actions.fetchFinancialStatement(params))

  return {
    financialStatementData,
    meta_financial_statement,
    fetchFinancialStatement,
  }
}

export default useFinancialStatement
