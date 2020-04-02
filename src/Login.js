import React from "react"
import axios from "axios"
import {Redirect} from 'react-router-dom'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      users:[]
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleSubmit = e => {
      e.preventDefault()
      axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
          const users = response.data.find(user => user.email == this.state.email)
          if (users) {
            console.log("Found Email", users, users.id)
            localStorage.setItem("storedId", users.id)
            this.setState({ users })
          } else {
            alert("No such email found")
            this.setState({email: ''})
          } 
        })
        
  }

  render(){
    //console.log(this.state.users)
    return (
      <div>
        {localStorage.length != 0 ? (
          <Redirect to={`/userProfile/${localStorage.getItem("storedId")}`} />
        ) : (
          <div>
            <div className="loginForm">
              <h2>Login</h2>
              <form onSubmit={this.handleSubmit}>
                <input
                  className="eInput"
                  type="email"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="enter email here"
                />
                <p> type email and press enter</p>
              </form>
            </div>
            <div className="test">
              <h4><u><em>test emails</em></u></h4>
              <p>Sincere@april.biz</p>
              <p>Nathan@yesenia.net</p>
              <p>Karley_Dach@jasper.info</p>
            </div>
          </div>
          )}
      </div>
    )
  }
}

export default Login