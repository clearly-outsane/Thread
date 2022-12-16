/* eslint-disable no-console */
import { FieldValues } from 'react-hook-form'
import { z } from 'zod'

import { procedure, router } from '../trpc'
import { write } from '../../lib/neo4j'

export const notesRouter = router({
  fetchNotes: procedure
    .input(
      z.object({
        text: z.custom<FieldValues>().optional(),
      }),
    )
    .query(async ({ input }) => {
      const res = await write(`
      MATCH (n)
      RETURN n`)

      // below code to fetch particular label. we can use this API with optional input param:
      // if we get input we can filter by label or whatever field, else fetch all

      //   if (input.text) {
      // console.log('fetching info for label...', input.text)
      //   res = await write(`
      //     MATCH (n:NOTE)
      //     RETURN n`)
      //   }

      res.forEach((ele) => {
        console.log(ele.n.properties)
      })

      return res
    }),

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
      CREATE (n:NOTE {text:'${input.text}'})
      RETURN n`)
      console.log(res[0].n)
    }),
})

// export type definition of API
export type NotesRouter = typeof notesRouter
