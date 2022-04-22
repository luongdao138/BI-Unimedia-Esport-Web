import * as APItDEV from 'src/graphql.DEV/graphqlAPI'
import * as APItPROD from 'src/graphql.PROD/graphqlAPI'
import * as APItSTG from 'src/graphql.STG/graphqlAPI'
import * as APItUM from 'src/graphql.UM/graphqlAPI'
import * as APItFEATURE from 'src/graphql.FEATURE/graphqlAPI'

const useGraphqlAPI = (): any => {
  switch (process.env.NEXT_PUBLIC_AWS_ENV) {
    case 'DEV':
      return APItDEV
    case 'PROD':
      return APItPROD
    case 'STG':
      return APItSTG
    case 'FEATURE':
      return APItFEATURE
    default:
      return APItUM
  }
}
export default useGraphqlAPI
