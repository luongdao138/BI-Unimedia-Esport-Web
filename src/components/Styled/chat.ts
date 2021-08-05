import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import theme from '@theme/index'
import Box from '@material-ui/core/Box'

export const PaperChat = styled(Paper)`
  height: 100%;
  border: 1px solid #3b3939;
  background: #2c2c2e;
  flex-direction: column;
  display: flex;
  min-height: 300px;
  @media (max-width: ${theme.breakpoints.values.md}px) {
    height: calc(100vh - (100vw / 1.777777777777778) - 75px - 49px);
    border: 0 none;
    padding-top: 0px;
    overflow: hidden;
  }
`

export const PaperDetail = styled(Paper)`
  min-height: 300px;
  margin-top: 4px;
  padding: 1rem;
`

export const ScrollView = styled(Box)`
  overflow-y: auto;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  margin-right: 1px;
  scrollbar-color: #222 transparent;
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 5px;
    padding: 2;
  }
  ::-webkit-scrollbar-track {
    padding-left: 1px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #222;
    border-radius: 6px;
  }
`

export const PlayerCard = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
