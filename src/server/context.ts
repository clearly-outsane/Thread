import { inferAsyncReturnType } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'

export async function createContext(ctxOptions?: CreateNextContextOptions) {
  const req = ctxOptions?.req
  const res = ctxOptions?.res

  return {
    req,
    res,
  }
}

export type MyContextType = inferAsyncReturnType<typeof createContext>
