export function getWebSocketUrl(userId: string | undefined): string | undefined {
  if (import.meta.server)
    return

  const isSecure = location.protocol === 'https:'
  const url = `${(isSecure ? 'wss://' : 'ws://') + location.host}/api/game-ws?userId=${userId}`

  return url
}
