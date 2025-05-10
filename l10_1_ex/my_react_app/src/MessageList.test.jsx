import { render, screen } from '@testing-library/react';
import MessageList from './MessageList';

// testing Message List component 

describe("testing MessageList", () => {
    // a functional test
    test('No message is rendered in empty MessageList', () => {
        const msgs = [];
        render(<MessageList 
                messages={msgs} />);
        const table = screen.getByTestId("message-list");
        expect(table).toBeInTheDocument(); // the table must be rendered.
        expect(table.firstElementChild.children.length == 1); // only contains the header row.
    });

    // a functional test
    test('A message is rendered in a singleton MessageList', () => {
        const msgTxt = "hello";
        const msgTime = (new Date()).toString();
        const msg = { time : msgTime, msg: msgTxt };
        const msgs = [msg];
        render(<MessageList 
                messages={msgs} />);
        const table = screen.getByTestId("message-list");
        const row = screen.getByTestId(msgTime);
        expect(table).toBeInTheDocument(); // the table must be rendered.
        expect(row).toBeInTheDocument(); // the row must be rendered.
        expect(table.contains(row));
    });
});

