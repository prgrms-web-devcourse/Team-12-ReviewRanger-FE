export type ToastType = 'error' | 'success'

export interface Toast {
  id: string
  type: ToastType
  message: string
}
