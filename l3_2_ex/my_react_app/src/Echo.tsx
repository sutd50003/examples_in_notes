import { useState, useEffect } from "react";

interface Message {
  time: string;
  msg: string;
}

interface NewMessageBarProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSubmitClick: () => void;
}

function NewMessageBar({message, onMessageChange, onSubmitClick}: NewMessageBarProps) {
    return (
        <div>
            <input type="text" placeholder=""
                value={message}
                onChange={(e) => {onMessageChange(e.target.value)}}>
            </input>
            <button onClick={onSubmitClick}> Submit </button>
        </div>
    )
}

interface MessageListProps {
  messages: Message[];
}

function MessageList({messages}: MessageListProps) {
    let rows = [];
    for (let i in messages) {
        rows.push(
            <tr key={messages[i].time}>
                <td>{messages[i].time}</td>
                <td>{messages[i].msg}</td></tr>
        );
    }
    return (
        <table>
            <tbody>
                <tr><th>Date Time</th><th>Message</th></tr>
                {rows}
            </tbody>
        </table>
    )
}


function Echo() {
    const [msgTxt, setMsgTxt] = useState("");
    function handleSubmitClick() {
        submitNewMessage();
    }
    const [messages, setMessages] = useState<Message[]>([]);

    async function submitNewMessage() {
        const response = await fetch(`http://localhost:3000/echo/submit`,
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
        const response = await fetch(`http://localhost:3000/echo/all`);
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


export default Echo;
