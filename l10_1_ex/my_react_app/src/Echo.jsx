import { useState, Component, useEffect } from "react";
import React from "react";
import NewMessageBar from "./NewMessageBar";
import MessageList from "./MessageList";


function Echo({http_addr}) {
    const [msgTxt, setMsgTxt] = useState("");
    function handleSubmitClick() {
        submitNewMessage();    
    }
    const [messages, setMessages] = useState([]);
    
    async function submitNewMessage() {
        console.log("submitNewMessage"); 
        console.log(msgTxt);
        const response = await fetch(`${http_addr}/echo/submit`,
        {
            method: 'POST',
            body: `msg=${msgTxt}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }              
        });
        const text = await response.text();
        const json = JSON.parse(text);
        setMessages(json);
    }


    async function initMessages() {
        const response = await fetch(`${http_addr}/echo/all`);
        const text = await response.text();
        const json = JSON.parse(text);
        setMessages(json);
    }

    useEffect( () => {
        initMessages();
    }, []);

    return (
        <div>
            <NewMessageBar message={msgTxt} onMessageChange={setMsgTxt} onSubmitClick={handleSubmitClick}/>
            <MessageList messages={messages}/>
        </div>
    );
}

/*
class Echo extends Component {
    constructor(props) {
        super(props);
        this.http_addr = props.http_addr;
        this.state = { msgTxt : "", messages: []}; 
    }
    
    async initMessages() {
        const response = await fetch(`${this.http_addr}/echo/all`);
        const text = await response.text();
        const json = JSON.parse(text);
        this.setMessages(json);
    }
    
    componentDidMount() {    
        this.initMessages();
    }

    async submitNewMessage() {
        const response = await fetch(`${this.http_addr}/echo/submit`,
        {
            method: 'POST',
            body: `msg=${this.state.msgTxt}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }              
        });
        const text = await response.text();
        const json = JSON.parse(text);
        this.setMessages(json);
    }

    setMsgTxt(s) {
        this.setState({ msgTxt: s, messages : this.state.messages });
    }

    setMessages(l) {
        this.setState({ msgTxt: this.state.msgTxt, messages : l});
    }
    
    handleSubmitClick() {
        this.submitNewMessage();    
    }

    render() {
        return (
            <div>
                <NewMessageBar message={this.state.msgTxt} onMessageChange={(s) => this.setMsgTxt(s)} onSubmitClick={() => this.handleSubmitClick()}/>
                <MessageList messages={this.state.messages}/>
            </div>
        );
    }
}
*/
export default Echo;