import { setupWorker } from 'msw'

import {
  manageHandlers,
  loginHandlers,
  signUpHandlers,
  mainHandlers,
} from './handlers'

export const worker = setupWorker(
  ...mainHandlers,
  ...signUpHandlers,
  ...loginHandlers,
  ...manageHandlers,
)
