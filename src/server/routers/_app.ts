/* eslint-disable no-console */
import { FieldValues } from 'react-hook-form'
import { z } from 'zod'

import { procedure, router } from '../trpc'
import { write } from '../../lib/neo4j'

export const appRouter = router({
  note: procedure
    .input(
      z.object({
        text: z.custom<FieldValues>(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(input.text)
      // do a cypher query to add a note

      const res = await write(`
      CREATE (n:NOTE {text:'${input.text.note}'})
      RETURN n`)
      console.log(res)
    }),
})
// export type definition of API
export type AppRouter = typeof appRouter
