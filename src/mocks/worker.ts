import { setupWorker } from 'msw'
import { loginHandlers } from './handlers'

export const worker = setupWorker(...loginHandlers)
