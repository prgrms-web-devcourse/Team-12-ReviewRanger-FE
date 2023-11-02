import { setupWorker } from 'msw'
import { createdReviewManageHandlers } from './handlers'
import { loginHandlers } from './handlers'
import { signUpHandlers } from './handlers'
import { mainHandlers } from './handlers'

export const worker = setupWorker(...mainHandlers, ...signUpHandlers, ...loginHandlers, ...createdReviewManageHandlers)
