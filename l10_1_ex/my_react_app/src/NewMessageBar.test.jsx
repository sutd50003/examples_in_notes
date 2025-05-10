import { render, screen } from '@testing-library/react';
import NewMessageBar from './NewMessageBar';

describe( "testing New Message Bar component", () => {
    // a visual test
    test('Button is rendered in NewMessageBar', () => {
        const msgTxt = "hello";
        const setMsgTxt = () => {};
        const handleSubmitClick = () => {};  
        render(<NewMessageBar 
                message={msgTxt} 
                onMessageChange={setMsgTxt} 
                onSubmitClick={handleSubmitClick}/>);
        const button = screen.getByText(/submit/i);
        expect(button).toBeInTheDocument();
    });

    // a visual test
    test('Textbox is rendered in NewMessageBar', () => {
        const msgTxt = "hello";
        const setMsgTxt = () => {};
        const handleSubmitClick = () => {};  
        render(<NewMessageBar 
            message={msgTxt} 
            onMessageChange={setMsgTxt} 
            onSubmitClick={handleSubmitClick}/>);
        const textbox = screen.getByLabelText("echo-message");
        expect(textbox.value).toBe('hello');
    });
});
  