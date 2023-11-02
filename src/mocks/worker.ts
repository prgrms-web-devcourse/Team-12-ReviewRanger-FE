import { setupWorker } from 'msw'
import {
  loginHandlers,
  signUpHandlers,
  mainHandlers,
  manageHandlers,
  createHandlers,
  profileHandlers,
} from './handlers'

export const worker = setupWorker(
  ...mainHandlers,
  ...signUpHandlers,
  ...createHandlers,
  ...profileHandlers,
  ...loginHandlers,
  ...manageHandlers,
)
