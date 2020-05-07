import React, { useState, useEffect } from 'react' // import the useState and useEffect methods from react.
import io from 'socket.io-client' // import the client socket.io
import TextField from '@material-ui/core/TextField' // utilize the text field from material ui library.
import './App.css'

const socket = io.connect('http://localhost:4000') // create a socket connection.

function UserInput() {
    // State to handle messages.
    const [state, setState] = useState({ message: '', name: '' })
    // State to handle chat log
    const [chat, setChat] = useState([])

    useEffect(() => {
        // use the .on() method to listen for a message on the socket. destructures the name and message from state.
        socket.on('message', ({ name, message }) => {
            //update the chat log by using the setChat() from useState. 
            // use the spread operator to access all the properties in the useState.
            // reference name, and message and updates the contents of chat with the new message.
            setChat([...chat, { name, message }])
            // console.log()
        })
    })

    const onTextChange = e => {
        // Takes in the event (the entered data)
        // As the user types, the state is being constantly updated.
        // Destructures the name and value properties of the event object.  
        setState({ ...state, [e.target.name]: e.target.value })
        // console.log(chat)
        console.log(state)
    }

    const onMessageSubmit = e => {
        e.preventDefault()
        // destructure name and message from the state object.
        const { name, message } = state
        // we use the emit() method to send the message to all clients connected on the socket.
        socket.emit('message', { name, message })
        // update the state with the newly added message so the renderChat function can display all messages with the new one.
        setState({ message: '', name })
        console.log(chat, socket.rooms)
    }

    const renderChat = () => {
        // use .map to iterate through the chat object. destructure name and message from the chat object, using the index as the key.
        // each time we iterate through a message we display it within the div under an h3 tag.
        return chat.map(({ name, message }, index) => (
            <div key={index}>
                <h3>
                    {name}: <span>{message}</span>
                </h3>
            </div>
        ))
    }

    return (
        <div className="card">
            <form onSubmit={onMessageSubmit}>
                <div className="name-field">
                    <TextField
                        name="name"
                        onChange={e => onTextChange(e)}
                        value={state.name}
                        label="Name"
                    />
                </div>
                <div>
                    <TextField
                        name="message"
                        onChange={e => onTextChange(e)}
                        value={state.message}
                        variant="outlined"
                        label="Message"
                    />
                </div>
                <button>SUBMIT</button>
            </form>
            <div className="render-chat">
                {/* <h1>Log</h1> */}
                {renderChat()}
            </div>
        </div>
    )
}

export default UserInput;
