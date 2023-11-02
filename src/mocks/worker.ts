import { setupWorker } from 'msw'
import { manageHandlers } from './handlers'

export const worker = setupWorker(...manageHandlers)
