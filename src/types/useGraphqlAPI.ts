import * as APItDEV from 'src/graphql.DEV/graphqlAPI'
import * as APItPROD from 'src/graphql.PROD/graphqlAPI'
import * as APItSTG from 'src/graphql.STG/graphqlAPI'
import * as APItUM from 'src/graphql.UM/graphqlAPI'

const useGraphqlAPI = (): any => {
  switch (process.env.NEXT_PUBLIC_AWS_ENV) {
    case 'DEV':
      return APItDEV
    case 'PROD':
      return APItPROD
    case 'STG':
      return APItSTG
    default:
      return APItUM
  }
}
export default useGraphqlAPI
