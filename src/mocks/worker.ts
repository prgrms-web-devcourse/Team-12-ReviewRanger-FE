import { setupWorker } from 'msw'
import { createdReviewManageHandlers } from './handlers'

export const worker = setupWorker(...createdReviewManageHandlers)
