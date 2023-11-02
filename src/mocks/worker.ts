import { setupWorker } from 'msw'
import {
  loginHandlers,
  signUpHandlers,
  mainHandlers,
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
  ...responseHandlers,
)
