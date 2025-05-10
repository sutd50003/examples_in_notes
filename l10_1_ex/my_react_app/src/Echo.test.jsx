import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// to address the CRA project missing TextEncoder for msw
// requires `npm i msw undici`
// https://github.com/mswjs/msw/issues/1796#issuecomment-1839196018
// import './jest.polyfills'
import {http, HttpResponse} from 'msw'; 
import {setupServer} from 'msw/node';
import Echo from './Echo';

const server = setupServer(
    http.get('/echo/all', () => {
      return HttpResponse.json(
        [{'msg':'hello','time':'2024-06-24T04:24:49.000Z'}])
    }),
    http.post('/echo/submit', () => {
        return HttpResponse.json(
          [{msg:'hello',time:'2024-06-24T04:24:49.000Z'},
           {msg:'bye', time:'2024-06-25T00:12:30.000Z'}
          ])
      }),
    )

describe("testing Echo component", () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())
    // some tests here 
    test('testing initMessage() in Echo', async () => {
        render(<Echo http_addr='' />);
        const msgTime = '2024-06-24T04:24:49.000Z';
        const table = await screen.findByTestId("message-list");
        const row = await screen.findByTestId(msgTime);
        expect(table).toBeInTheDocument(); // the table must be rendered.
        expect(row).toBeInTheDocument(); // the row must be rendered.
        expect(table.contains(row));
    });
    
    test('testing submitNewMessage() in Echo', async () => {
        const msgTxt = "bye";
        render(<Echo http_addr='' />);
        const textbox = screen.getByLabelText('echo-message');
        const submitButton = screen.getByText(/submit/i);
        fireEvent.change(textbox, {target: {value: msgTxt}});
        userEvent.click(submitButton);
        expect(textbox.value).toBe(msgTxt);
        const msgTime = '2024-06-25T00:12:30.000Z';
        const table = await screen.findByTestId("message-list");
        const row = await screen.findByTestId(msgTime);
        expect(table).toBeInTheDocument(); // the table must be rendered.
        expect(row).toBeInTheDocument(); // the row must be rendered.
        expect(table.contains(row));
    })
})


