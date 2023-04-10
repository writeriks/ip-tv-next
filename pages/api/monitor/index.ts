import nc from 'next-connect'
import cors from 'cors'
/* import { uuid } from 'uuidv4' */
import { Server } from 'socket.io'

const monitor = nc()
  .use(cors())
  .get(async (req: any, res: any) => {
    /* res.status(200).json(uuid()) */
    if (res.socket.server.io) {
      console.log('Socket is already attached')
      return res.end()
    }

    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log(`User Connected : ${socket.id}`)
      // Triggered when a peer hits the join room button.
      socket.on('join', (roomName) => {
        const { rooms } = io.sockets.adapter
        const room = rooms.get(roomName)

        // room == undefined when no such room exists.
        if (room === undefined) {
          socket.join(roomName)
          socket.emit('created')
        } else if (room.size === 1) {
          // room.size == 1 when one person is inside the room.
          socket.join(roomName)
          socket.emit('joined')
        } else {
          // when there are already two people inside the room.
          socket.emit('full')
        }
        console.log(rooms)
      })

      // Triggered when the person who joined the room is ready to communicate.
      socket.on('ready', (roomName) => {
        socket.broadcast.to(roomName).emit('ready') // Informs the other peer in the room.
      })

      // Triggered when server gets an icecandidate from a peer in the room.
      socket.on('ice-candidate', (candidate, roomName: string) => {
        console.log(candidate)
        socket.broadcast.to(roomName).emit('ice-candidate', candidate) // Sends Candidate to the other peer in the room.
      })

      // Triggered when server gets an offer from a peer in the room.
      socket.on('offer', (offer, roomName) => {
        socket.broadcast.to(roomName).emit('offer', offer) // Sends Offer to the other peer in the room.
      })

      // Triggered when server gets an answer from a peer in the room
      socket.on('answer', (answer, roomName) => {
        socket.broadcast.to(roomName).emit('answer', answer) // Sends Answer to the other peer in the room.
      })

      socket.on('leave', (roomName) => {
        socket.leave(roomName)
        socket.broadcast.to(roomName).emit('leave')
      })
    })

    return res.end()
  })

export const config = {
  api: {
    bodyParser: false, // Defaults to true. Setting this to false disables body parsing and allows you to consume the request body as stream or raw-body.
    responseLimit: false, // Determines how much data should be sent from the response body. It is automatically enabled and defaults to 4mb.
    externalResolver: true, // Disables warnings for unresolved requests if the route is being handled by an external resolver like Express.js or Connect. Defaults to false.
  },
}

export default monitor
