/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useCallback, Fragment } from 'react'
import ConfirmContext from './ConfirmContext'
import ConfirmationDialog from './ConfirmationDialog'
import { ConfirmOptions } from './types'

const DEFAULT_OPTIONS: ConfirmOptions = {
  title: 'Are you sure?',
  description: '',
  content: null,
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
}

const buildOptions = (defaultOptions, options): ConfirmOptions => {
  const dialogProps = {
    ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
    ...(options.dialogProps || {}),
  }
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps || DEFAULT_OPTIONS.confirmationButtonProps),
    ...(options.confirmationButtonProps || {}),
  }
  const cancellationButtonProps = {
    ...(defaultOptions.cancellationButtonProps || DEFAULT_OPTIONS.cancellationButtonProps),
    ...(options.cancellationButtonProps || {}),
  }

  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  }
}

const ConfirmProvider = ({ children, defaultOptions = {} }) => {
  const [options, setOptions] = useState<ConfirmOptions>({ ...DEFAULT_OPTIONS, ...defaultOptions })
  const [resolveReject, setResolveReject] = useState([])
  const [resolve, reject] = resolveReject

  const confirm = useCallback((options: ConfirmOptions = {}): Promise<void> => {
    return new Promise((resolve, reject) => {
      setOptions(buildOptions(defaultOptions, options))
      setResolveReject([resolve, reject])
    })
  }, [])

  const handleClose = useCallback(() => {
    setResolveReject([])
  }, [])

  const handleCancel = useCallback(() => {
    reject()
    handleClose()
  }, [reject, handleClose])

  const handleConfirm = useCallback(() => {
    resolve()
    handleClose()
  }, [resolve, handleClose])

  return (
    <Fragment>
      <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
      <ConfirmationDialog
        open={resolveReject.length === 2}
        options={options}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  )
}

export default ConfirmProvider
