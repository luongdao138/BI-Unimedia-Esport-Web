import { FinancialStatementDetailData, FinancialStatementDetailParams } from '@services/financial.service'
import financial from '@store/financial'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = financial
const _fetchFinancialStatementDetail = createMetaSelector(actions.fetchFinancialStatementDetail)

const useFinancialStatementDetail = (): {
  meta_financial_statement_detail: Meta
  fetchFinancialStatementDetail(params: FinancialStatementDetailParams): void
  financialStatementDetailData: FinancialStatementDetailData
} => {
  const dispatch = useAppDispatch()

  const financialStatementDetailData = useAppSelector(selectors.financialStatementDetail)

  const meta_financial_statement_detail = useAppSelector(_fetchFinancialStatementDetail)

  const fetchFinancialStatementDetail = (params: FinancialStatementDetailParams) => dispatch(actions.fetchFinancialStatementDetail(params))

  return {
    financialStatementDetailData,
    meta_financial_statement_detail,
    fetchFinancialStatementDetail,
  }
}

export default useFinancialStatementDetail
