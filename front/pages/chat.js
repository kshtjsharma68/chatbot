import React from "react";
import io from "socket.io-client";
import { API_LINK } from '../config.js';

export default class Chat extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            username: "",
            message: ""
        };

        this.socket = io.connect(`${API_LINK}`)
        this.addMessage = async function (data) {
            this.setState((prevState, prevProp) => {
                let m = { messages: [ ...prevState.messages, data ]};
                localStorage.setItem("messages", JSON.stringify(m));
                return m;
            })
        }
    }

    

    sendMessage = e => {
        e.preventDefault();
        this.socket.emit("SEND_MESSAGE", {
            author: this.state.username,
            message: this.state.message
        })
        this.setState({message: ""})
    }

    componentDidMount() {       
        let _this = this;
        let { messages } = JSON.parse(localStorage.getItem("messages"));
        // console.log("messages",messages)
        if ( messages && messages.length ) {
            this.setState({ messages })
        }
        this.socket.on("RECIEVE_MESSAGE", function(data) {
            _this.addMessage(data);
        })
    }

    // static getInitialProps() {
    //     console.log('insinde')
    // }

    render() {
        let { messages, username, message } = this.state;
        return (
            <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">Chatting room</div>
                                    <hr/>
                                    <div className="messages">
                                        
                                    </div>
                                </div>
                                <div className="card-footer">
                                        <input type="text" placeholder="Username" className="form-control"
                                        value={username}
                                        onChange={e => this.setState({
                                            username: e.target.value
                                        })} />
                                        <br/>
                                        <input type="text" placeholder="Message" className="form-control"
                                        value={message}
                                        onChange={e => this.setState({
                                            message: e.target.value
                                        })}/>
                                        <br/>
                                        <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                </div>
                            </div>
                            <div className="card">
                                <ol>
                                {messages.map((message, k) => <li key={k}>{message.author}: {message.message}</li>)}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
    
}