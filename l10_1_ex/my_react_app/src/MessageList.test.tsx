import { render, screen } from '@testing-library/react';
import MessageList from './MessageList';

// testing Message List component 

interface Message {
  time: string;
  msg: string;
}

describe("testing MessageList", () => {
    // a functional test
    test('No message is rendered in empty MessageList', () => {
        const msgs: Message[] = [];
        render(<MessageList 
                messages={msgs} />);
        const table = screen.getByTestId("message-list");
        expect(table).toBeInTheDocument(); // the table must be rendered.
        expect(table.firstElementChild?.children.length === 1); // only contains the header row.
    });

    // a functional test
    test('A message is rendered in a singleton MessageList', () => {
        const msgTxt: string = "hello";
        const msgTime: string = (new Date()).toString();
        const msg: Message = { time : msgTime, msg: msgTxt };
        const msgs: Message[] = [msg];
        render(<MessageList 
                messages={msgs} />);
        const table = screen.getByTestId("message-list");
        const row = screen.getByTestId(msgTime);
        expect(table).toBeInTheDocument(); // the table must be rendered.
        expect(row).toBeInTheDocument(); // the row must be rendered.
        expect(table.contains(row));
    });
});
