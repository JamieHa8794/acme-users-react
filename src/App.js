import React, {Component} from 'react'
import axios from 'axios'
import User from './User'

class App extends Component{
    constructor(){
        super();
        this.state = {
            users: [],
            selectedUserId: ''
        }
    }
    async componentDidMount(){
        const users = (await axios.get('/api/users')).data
        this.setState({users: users})
        window.addEventListener('hashchange', ()=>{
            this.setState({selectedUserId: window.location.hash.slice(1)})
        })
        this.setState({selectedUserId: window.location.hash.slice(1)})
    }
    render(){
        const { users, selectedUserId } = this.state;
        return(
            <div>
                <div>
                    <h1>
                        Acme Users
                    </h1>
                    <ul>
                        {
                            users.map( (user,idx) =>{
                                return(
                                    <li key={idx} className = {selectedUserId*1 === user.id ? 'selected': ''}>
                                        <a href={`#${user.id}`}>
                                        { user.name } 
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div>
                        {
                            !!selectedUserId && <User selectedUserId={selectedUserId}/>
                        }
                </div>
            </div>
        )
    }
}

export default App;