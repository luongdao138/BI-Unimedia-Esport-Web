import * as React from 'react'
import { DialogProps } from '@material-ui/core/Dialog'

import { PrimaryButtonProps } from '@components/ButtonPrimary'
import { ESButtonProps } from '@components/Button'

export interface ConfirmOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  content?: React.ReactNode | null
  confirmationText?: React.ReactNode
  cancellationText?: React.ReactNode
  dialogProps?: Omit<DialogProps, 'open'>
  confirmationButtonProps?: PrimaryButtonProps
  cancellationButtonProps?: ESButtonProps
  additionalText?: React.ReactNode
}

export interface ConfirmProviderProps {
  defaultOptions?: ConfirmOptions
}

export const ConfirmProvider: React.ComponentType<ConfirmProviderProps>

export const useConfirm: () => (options?: ConfirmOptions) => Promise<void>
