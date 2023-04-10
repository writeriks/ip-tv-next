// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import useSocket from '../../hooks/use-socket'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import styles from '../../styles/MonitorVideo.module.scss'

const Monitor = () => {
  useSocket()
  const [isMeMuted, setIsMeMuted] = useState(true)
  const [isPartnerMuted, setIsPartnerMuted] = useState(true)
  const router = useRouter()

  const userVideoRef = useRef<HTMLVideoElement>(null)
  const peerVideoRef = useRef<HTMLVideoElement>(null)
  const rtcConnectionRef = useRef<RTCPeerConnection>(null)
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>()
  const userStreamRef = useRef<MediaStream>()
  const hostRef = useRef(false)

  const onPeerLeave = () => {
    // This person is now the creator because they are the only person in the room.
    hostRef.current = true
    if (peerVideoRef.current.srcObject) {
      peerVideoRef.current.srcObject.getTracks().forEach((track) => track.stop()) // Stops receiving all track of Peer.
    }

    // Safely closes the existing connection established with the peer who left.
    if (rtcConnectionRef.current) {
      rtcConnectionRef.current.ontrack = null
      rtcConnectionRef.current.onicecandidate = null
      rtcConnectionRef.current.close()
      rtcConnectionRef.current = null
    }
  }

  const leaveRoom = () => {
    socketRef.current.emit('leave', roomName) // Let's the server know that user has left the room.

    if (userVideoRef.current.srcObject) {
      userVideoRef.current.srcObject.getTracks().forEach((track) => track.stop()) // Stops receiving all track of User.
    }
    if (peerVideoRef.current.srcObject) {
      peerVideoRef.current.srcObject.getTracks().forEach((track) => track.stop()) // Stops receiving audio track of Peer.
    }

    // Checks if there is peer on the other side and safely closes the existing connection established with the peer.
    if (rtcConnectionRef.current) {
      rtcConnectionRef.current.ontrack = null
      rtcConnectionRef.current.onicecandidate = null
      rtcConnectionRef.current.close()
      rtcConnectionRef.current = null
    }
    router.push('/')
  }

  const handleTrackEvent = (event) => {
    peerVideoRef.current.srcObject = event.streams[0]
  }

  const handlerNewIceCandidateMsg = (incoming) => {
    // We cast the incoming candidate to RTCIceCandidate
    const candidate = new RTCIceCandidate(incoming)
    rtcConnectionRef.current.addIceCandidate(candidate).catch((e) => console.log(e))
  }

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      socketRef.current.emit('ice-candidate', event.candidate, roomName)
    }
  }

  const handleAnswer = (answer) => {
    rtcConnectionRef.current.setRemoteDescription(answer).catch((err) => console.log(err))
  }

  const handleReceivedOffer = (offer) => {
    if (!hostRef.current) {
      rtcConnectionRef.current = createPeerConnection()
      rtcConnectionRef.current.addTrack(userStreamRef.current.getTracks()[0], userStreamRef.current)
      rtcConnectionRef.current.addTrack(userStreamRef.current.getTracks()[1], userStreamRef.current)
      rtcConnectionRef.current.setRemoteDescription(offer)

      rtcConnectionRef.current
        .createAnswer()
        .then((answer) => {
          rtcConnectionRef.current.setLocalDescription(answer)
          socketRef.current.emit('answer', answer, roomName)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const initiateCall = () => {
    if (hostRef.current) {
      rtcConnectionRef.current = createPeerConnection()
      userStreamRef.current &&
        rtcConnectionRef.current.addTrack(userStreamRef.current.getTracks()[0], userStreamRef.current)
      userStreamRef.current &&
        rtcConnectionRef.current.addTrack(userStreamRef.current.getTracks()[1], userStreamRef.current)
      rtcConnectionRef.current
        .createOffer()
        .then((offer) => {
          rtcConnectionRef.current.setLocalDescription(offer)
          socketRef.current.emit('offer', offer, roomName)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const ICE_SERVERS = {
    iceServers: [
      {
        urls: 'stun:openrelay.metered.ca:80',
      },
    ],
  }

  const createPeerConnection = () => {
    // We create a RTC Peer Connection
    const connection = new RTCPeerConnection(ICE_SERVERS)

    // We implement our onicecandidate method for when we received a ICE candidate from the STUN server
    connection.onicecandidate = handleICECandidateEvent

    // We implement our onTrack method for when we receive tracks
    connection.ontrack = handleTrackEvent
    return connection
  }

  const handleRoomCreated = () => {
    hostRef.current = true
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 500, height: 500 },
      })
      .then((stream) => {
        /* use the stream */
        userStreamRef.current = stream
        if (userVideoRef.current) {
          /////
          userVideoRef.current.srcObject = stream
          userVideoRef.current.onloadedmetadata = () => {
            if (userVideoRef.current) {
              ///////
              userVideoRef.current.play()
            }
          }
        }
      })
      .catch((err) => {
        /* handle the error */
        console.log(err)
      })
  }

  const handleRoomJoined = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 500, height: 500 },
      })
      .then((stream) => {
        /* use the stream */
        if (userVideoRef.current) {
          userStreamRef.current = stream
          userVideoRef.current.srcObject = stream
          userVideoRef.current.onloadedmetadata = () => {
            if (userVideoRef.current) {
              userVideoRef.current.play()
            }
          }
          socketRef.current?.emit('ready', roomName)
        }
      })
      .catch((err) => {
        /* handle the error */
        console.log('error', err)
      })
  }

  const { id: roomName } = router.query
  useEffect(() => {
    socketRef.current = io()
    // First we join a room
    socketRef.current.emit('join', roomName)

    socketRef.current.on('created', handleRoomCreated)

    socketRef.current.on('joined', handleRoomJoined)
    // If the room didn't exist, the server would emit the room was 'created'

    // Whenever the next person joins, the server emits 'ready'
    socketRef.current.on('ready', initiateCall)

    // Emitted when a peer leaves the room
    socketRef.current.on('leave', onPeerLeave)

    // If the room is full, we show an alert
    socketRef.current.on('full', () => {
      window.location.href = '/'
    })

    // Events that are webRTC speccific
    socketRef.current.on('offer', handleReceivedOffer)
    socketRef.current.on('answer', handleAnswer)
    socketRef.current.on('ice-candidate', handlerNewIceCandidateMsg)

    // clear up after
    return () => {
      socketRef.current?.disconnect()
    }
  }, [roomName])

  return (
    <div className={styles.monitorMainContainer}>
      <div className={styles.partnerContainer}>
        <video className={styles.partnerVideoPlayer} autoPlay ref={peerVideoRef} playsinline muted={isPartnerMuted} />
        <div className={styles.buttonContainer}>
          <button onClick={() => peerVideoRef.current?.play()} type="button">
            Play partner
          </button>
          <button onClick={() => setIsPartnerMuted(!isPartnerMuted)} type="button">
            {isPartnerMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      </div>

      <div className={styles.userContainer}>
        <video className={styles.userVideoPlayer} autoPlay ref={userVideoRef} playsinline muted={isMeMuted} />
        <div className={styles.buttonContainer}>
          <button onClick={() => userVideoRef.current?.play()} type="button">
            Play me
          </button>
          <button onClick={() => setIsMeMuted(!isMeMuted)} type="button">
            {isMeMuted ? 'Unmute' : 'Mute'}
          </button>
          <button onClick={leaveRoom} type="button">
            Leave
          </button>
        </div>
      </div>
    </div>
  )
}

export default Monitor
