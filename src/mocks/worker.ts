import { setupWorker } from 'msw'
import {
  loginHandlers,
  signUpHandlers,
  mainHandlers,
  profileHandlers,
  responseHandlers,
} from './handlers'

export const worker = setupWorker(
  ...mainHandlers,
  ...signUpHandlers,
  ...profileHandlers,
  ...loginHandlers,
  ...responseHandlers,
)
