function MessageList({messages}) {
    let rows = [];
    for (let i in messages) {
        rows.push(
            <tr key={messages[i].time}
                data-testid={messages[i].time}>
                <td>{messages[i].time}</td><td>{messages[i].msg}</td></tr>
        );
    }
    return (
        <table data-testid="message-list">
            <tbody>
                <tr><th>Date Time</th><th>Message</th></tr>
                {rows}
            </tbody>
        </table>
    )
}


export default MessageList;