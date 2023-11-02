import { setupWorker } from 'msw'
import {
  loginHandlers,
  signUpHandlers,
  mainHandlers,
  profileHandlers,
  createdReviewManageHandlers
} from './handlers'

export const worker = setupWorker(
  ...mainHandlers,
  ...signUpHandlers,
  ...profileHandlers,
  ...loginHandlers,
  ...createdReviewManageHandlers
)
