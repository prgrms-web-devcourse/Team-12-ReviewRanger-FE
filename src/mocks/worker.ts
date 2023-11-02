import { setupWorker } from 'msw'
import { signUpHandlers } from './handlers'

export const worker = setupWorker(...signUpHandlers)
