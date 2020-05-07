import React, { useState, useEffect } from 'react' // import the useState and useEffect methods from react.
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import io from 'socket.io-client' // import the client socket.io


const socket = io.connect('http://localhost:4000') // create a socket connection.




export default function CreateRoom() {
    const [state, setState] = useState({ roomName: '' })
    // State to handle chat log
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        // use the .on() method to listen for a message on the socket. destructures the name and message from state.
        socket.on('name', ({ name }) => {
            //update the chat log by using the setChat() from useState. 
            // use the spread operator to access all the properties in the useState.
            // reference name, and message and updates the contents of chat with the new message.
            setRooms([...rooms, { name }])
        })
    })

    const onTextChange = e => {
        // Takes in the event (the entered data)
        // As the user types, the state is being constantly updated.
        // Destructures the name and value properties of the event object.  
        setState({ ...state, [e.target.name]: e.target.value })
        // console.log(state)
    }

    const onMessageSubmit = e => {
        e.preventDefault()
        // destructure name and message from the state object.
        const { name } = state
        // we use the emit() method to send the message to all clients connected on the socket.
        socket.emit('name', { name })
        // update the state with the newly added message so the renderChat function can display all messages with the new one.
        setState({ name })
        console.log(rooms)
    }

    const renderChat = () => {
        // use .map to iterate through the chat object. destructure name and message from the chat object, using the index as the key.
        // each time we iterate through a message we display it within the div under an h3 tag.
        return rooms.map(({ name }, index) => (
            <div key={index}>
                <h3>
                    {name} 
                </h3>
            </div>
        ))
    }    
    return (
        <Container>
            <h1>Create Room</h1>
            <form onSubmit={onMessageSubmit}>
                <div className="name-field">
                    <TextField
                        name="name"
                        onChange={e => onTextChange(e)}
                        value={state.name}
                        label="Room Name"
                    />
                </div>
                {/* <div>
                    <TextField
                        name="message"
                        onChange={e => onTextChange(e)}
                        value={state.message}
                        variant="outlined"
                        label="Message"
                    />
                </div> */}
                <button>SUBMIT</button>
            </form>
            <div><h1>Available Rooms</h1>{renderChat()}</div>

        </Container>

    )
}