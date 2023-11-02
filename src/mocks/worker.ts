import { setupWorker } from 'msw'
import {
  loginHandlers,
  signUpHandlers,
  mainHandlers,
  profileHandlers,
} from './handlers'

export const worker = setupWorker(
  ...mainHandlers,
  ...signUpHandlers,
  ...profileHandlers,
  ...loginHandlers,
)
