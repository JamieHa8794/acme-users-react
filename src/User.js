import React, { Component } from "react";
import axios from "axios";

class User extends Component{
    constructor(){
        super();
        this.state = {
            user: {}
        }
    }
    componentDidUpdate(){
        console.log(this.props)
    }
    async componentDidMount(){
        const userId = this.props.selectedUserId*1
        const user = (await axios.get(`/api/users/${userId}`)).data
        this.setState({user})
    }
    render(){
        const {user} = this.state
        return(
            <div>
                <h2>
                    {user.name}'s bio
                </h2>    
                <div>
                    {user.bio}
                </div>
            </div>
        )
    }
}

export default User;