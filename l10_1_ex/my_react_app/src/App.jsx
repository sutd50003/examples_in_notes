import { useState } from 'react'
import Echo from './Echo';

function App() {
  const url = `http://localhost:3000`;
  return (
      <div>
        <h1> Echo App </h1>
        <Echo http_addr={url}/>
      </div>
      
  );
}

export default App
