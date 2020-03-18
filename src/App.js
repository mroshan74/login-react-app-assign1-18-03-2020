import React from 'react'
import Authenticate from './Authenticate'
import {BrowserRouter,Link,Route} from 'react-router-dom'
import Login from './Login'
function App(props){
    return (
      <BrowserRouter>
        <div>
            <Login/>
            <Route path='/login' component={Login} />
        </div>
      </BrowserRouter>
    ); 
}

export default App