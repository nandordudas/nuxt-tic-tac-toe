export default defineEventHandler(async (event) => {
  if (!event.context.auth)
    throw createError({ statusCode: 401, statusMessage: 'Not logged in' })

  setResponseHeader(event, 'Accept', 'application/vnd.api+json')

  return {
    data: { fields, success: true },
    errors: null,
  } as const
})
