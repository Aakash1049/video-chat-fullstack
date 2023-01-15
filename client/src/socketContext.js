import React,{createContext,useState,useRef,useEffect} from "react";
import {io} from "socket.io-client"
import Peer from "simple-peer"

const SocketContext= createContext()
// const socket=io("http://localhost:5000")
const socket=io("https://video-chat-backend-8q91.onrender.com")


const ContextProvider=({children})=>{
    const [stream,setStream]=useState()
    const [name, setName]=useState("")
    const myVideo=useRef()
    const userVideo=useRef()
    const connectionRef=useRef()
    const [me,setMe]=useState("")
    const [call,setCall]=useState({})
    const [callAccepted, setCallAccepted]=useState(false)
    const [callEnded, setCallEnded]=useState(false)

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then((currentSream)=>{
            setStream(currentSream)
            if (myVideo.current) {
                // myVideo.current.srcObject = myStream
                myVideo.current.srcObject=currentSream
              }
        })

        socket.on("me",(id)=>{
            setMe(id)
        })
        socket.on("calluser",({from,name:callerName,signal})=>{
            setCall({isReceivedCall:true, from, name:callerName, signal})
        })
    },[])

   
    const answerCall=()=>{
        setCallAccepted(true)
        const peer = new  Peer({initiator:false, trickle:false,config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' },{urls: 'stun:global.stun.twilio.com:3478?transport=udp' }]}, stream })
        peer.on("signal",(data)=>{
            socket.emit("answercall",{signal:data, to:call.from})

        })
        peer.on("stream",(currentSream)=>{
            userVideo.current.srcObject= currentSream
        })
        // {console.log(userVideo)}
        peer.signal(call.signal)

        connectionRef.current = peer
    }
    const callUser=(id)=>{
        const peer = new  Peer({initiator:true, trickle:false,config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' },{urls: 'stun:global.stun.twilio.com:3478?transport=udp' }]}, stream })
        peer.on("signal",(data)=>{
            socket.emit("calluser",{userToCall: id,signalData:data, from:me, name})

        })
        peer.on("stream",(currentSream)=>{
            userVideo.current.srcObject= currentSream
        })

        peer.on("callaccepted",(signal)=>{
            setCallAccepted(true)
            peer.signal(signal)
        })
        connectionRef.current = peer

        
    }
    const leaveCall=()=>{
        setCallEnded(true)
        connectionRef.current.destroy()
        window.location.reload()
    }

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall
        }}>
            {children}

        </SocketContext.Provider>
    )
}
export {ContextProvider, SocketContext}
