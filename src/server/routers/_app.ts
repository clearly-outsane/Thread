/* eslint-disable no-console */

import { notesRouter } from './notes'

export const appRouter = notesRouter

// export type definition of API
export type AppRouter = typeof appRouter
