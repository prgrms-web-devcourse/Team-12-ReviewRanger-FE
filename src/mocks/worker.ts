import { setupWorker } from 'msw'
import {
  loginHandlers,
  signUpHandlers,
  mainHandlers,
  manageHandlers,
  createHandlers,
  profileHandlers,
  responseHandlers,
} from './handlers'

export const worker = setupWorker(
  ...mainHandlers,
  ...signUpHandlers,
  ...createHandlers,
  ...profileHandlers,
  ...loginHandlers,
  ...manageHandlers,
  ...responseHandlers,
)
