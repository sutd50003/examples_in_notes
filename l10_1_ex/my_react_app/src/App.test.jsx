import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("An end-to-end testing for Echo", () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  test('End-to-end testing on App', async () => {
    const msgTxt = "test message" + getRandomInt(1000);
    render(<App />);
    const textbox = screen.getByLabelText('echo-message');
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(textbox, {target: {value: msgTxt}});
    expect(textbox.value).toBe(msgTxt);
    const _     = await userEvent.click(submitButton);
    const table = await screen.findByTestId("message-list");
    fireEvent.change(textbox, {target: {value: ''}});
    const text = await screen.findByText(msgTxt);
    expect(table).toBeInTheDocument(); // the table must be rendered.
    expect(text).toBeInTheDocument(); // the row must be rendered.
    expect(table.contains(text));
  })  
});
