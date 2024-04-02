import { consola } from 'consola'
import type { Peer } from 'crossws'
import { getQuery } from 'ufo'

interface Appearance {
  online: boolean
}

const ROOM_ID = 'game'
const ONLINE: Appearance = { online: true }
const OFFLINE: Appearance = { online: false }

const users = new Map<string, Appearance>()

export default defineWebSocketHandler({
  close(peer) {
    consola.log(`[ws] close ${peer}`)

    const userId = getUserId(peer)

    users.set(userId, OFFLINE)
  },

  error(peer, error) {
    consola.log(`[ws] error ${peer}`, error)
  },

  async message(peer, message) {
    consola.log(`[ws] message ${peer} ${message.text()}`)

    const userId = getUserId(peer)

    if (message.text() === 'ping') {
      peer.send({ message: 'pong', user: 'server' })

      return
    }

    const _message = {
      message: message.text(),
      user: userId,
    } as const

    peer.send(_message) // echo back
    peer.publish('chat', _message)

    // Store message in database
    await addMessage(userId, message.text())
  },

  open(peer) {
    consola.log(`[ws] open ${peer}`)

    const userId = getUserId(peer)

    users.set(userId, ONLINE)

    const stats = getStats()

    peer.send({
      message: `Welcome to the server ${userId}! (Online users: ${stats.online}/${stats.total})`,
      user: 'server',
    })

    peer.subscribe(ROOM_ID)
    peer.publish(ROOM_ID, { message: `${peer} joined!`, user: 'server' })
  },
})

function getUserId(peer: Peer): string {
  const query = getQuery<{ userId: string }>(peer.url)

  return query.userId
}

function getStats(): { online: number, total: number } {
  const online = Array.from(users.values()).filter(u => u.online).length

  return { online, total: users.size }
}

async function addMessage(_userId: string, _message: string): Promise<void> {
  // TODO
}
