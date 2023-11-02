import { setupWorker } from 'msw'
import { signUpHandlers } from './handlers'
import { mainHandlers } from './handlers'

export const worker = setupWorker(...mainHandlers, ...signUpHandlers)
