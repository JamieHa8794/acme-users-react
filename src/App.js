import React, {Component} from 'react'
import axios from 'axios'

class App extends Component{
    constructor(){
        super();
        this.state = {
            users: []
        }
    }
    async componentDidMount(){
        const users = (await axios.get('/api/users')).data
        this.setState({users})
    }
    render(){
        const { users } = this.state;
        return(
            <div>
                <h1>
                    Acme Users
                </h1>
                <ul>
                    {
                        users.map( (user,idx) =>{
                            return(
                                <li key={idx}>
                                    <a href={`#${user.id}`}>
                                    { user.name } 
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default App;