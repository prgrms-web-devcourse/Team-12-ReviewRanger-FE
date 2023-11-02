import { setupWorker } from 'msw'
import {
  loginHandlers,
  signUpHandlers,
  mainHandlers,
  manageHandlers,
} from './handlers'

export const worker = setupWorker(
  ...mainHandlers,
  ...signUpHandlers,
  ...loginHandlers,
  ...manageHandlers,
)
