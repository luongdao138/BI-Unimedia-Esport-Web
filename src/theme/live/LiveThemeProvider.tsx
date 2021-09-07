import { ReactNode } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

interface LiveThemeProviderProps {
  children: ReactNode
}

export const LiveThemeProvider: React.FC<LiveThemeProviderProps> = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export default LiveThemeProvider
