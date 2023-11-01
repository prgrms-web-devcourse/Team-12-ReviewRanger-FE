import { setupWorker } from 'msw'
import { mainHandlers } from './handlers'

export const worker = setupWorker(...mainHandlers)
