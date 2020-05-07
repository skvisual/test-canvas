import React from 'react' // import the useState and useEffect methods from react.
import { HashRouter as Router, Route } from "react-router-dom";
// import io from 'socket.io-client' ;// import the client socket.io
import CreateLobby from './pages/CreateLobby';
import './App.css'


function App() {

  return (
    <Router>
      <Route exact path="/" component={CreateLobby} />
      {/* <Route exact path="/pages/CreateLobby" component={CreateLobby} /> */}

    </Router>


  )
}

export default App
