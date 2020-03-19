import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class UserProfile extends React.Component{
    constructor(){
        super()
        this.state={
            user:[],
            posts:[],
            redirect:false
        }
    }

    componentDidMount(){
      console.log(this.props)
        if (localStorage.length != 0) {  // non login retention check
          const uid = localStorage.getItem("storedId")
          axios
            .get(`https://jsonplaceholder.typicode.com/users/${uid}`)
            .then(response => {
              const user = response.data
              this.setState({ user })
            })
            .catch(err => {
              console.log(err)
            })

          axios
            .get(`https://jsonplaceholder.typicode.com/posts?userId=${uid}`)
            .then(response => {
              const posts = response.data
              this.setState({ posts })
            })
            .catch(err => {
              console.log(err)
            })
          } 
          
          else {
              alert('you are not logged in')
              this.setState({ redirect: true })
        }
        
    }
    
    handleOut=()=>{
        localStorage.clear()
        //window.location.reload(false)
        this.setState({redirect:true})
    }

    render(){
        //console.log(this.state.user,this.state.posts)
        return (

          <div className='userDiv'>
            {this.state.redirect && <Redirect to='/'/> }
            <button className='btn' onClick={this.handleOut}>Log out</button>
            <h2>{this.state.user.name}</h2>
            <p>{this.state.user.email}</p>
            <p>{this.state.user.phone}</p>

            <p>{this.state.user.website}</p>

            <br />
            <hr />
            <h3>Posts made</h3>
            <ul>
              {this.state.posts.map((post, i) => {
                return (
                  <li key={i}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )
    }
}

export default UserProfile