import { setupWorker } from 'msw'
import {
  loginHandlers,
  signUpHandlers,
  mainHandlers,
  createHandlers,
} from './handlers'

export const worker = setupWorker(
  ...mainHandlers,
  ...signUpHandlers,
  ...loginHandlers,
  ...createHandlers,
)
