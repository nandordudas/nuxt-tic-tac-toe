import { consola } from 'consola'
import { z } from 'zod'

const schema = z.object({
  x: z.number(),
  y: z.number(),
})

export default defineEventHandler(async (event) => {
  if (!event.context.auth)
    throw createError({ statusCode: 401, statusMessage: 'Not logged in' })

  const body = await readValidatedBody(event, schema.safeParse)

  if (!body.success) {
    consola.error(body.error.issues)
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  const field = fields.find(({ x, y }) => x === body.data.x && y === body.data.y)

  if (!field)
    throw createError({ statusCode: 404, statusMessage: 'Field not found' })

  if (field.value)
    throw createError({ statusCode: 400, statusMessage: 'Field already selected' })

  field.value = event.context.auth?.id.toString()

  setResponseHeader(event, 'Accept', 'application/vnd.api+json')

  return {
    data: { fields, success: true },
    errors: null,
  } as const
})
