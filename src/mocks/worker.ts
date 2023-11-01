import { setupWorker } from 'msw'
import { handlers, signUpHandlers } from './handlers'

export const worker = setupWorker(...handlers, ...signUpHandlers)
