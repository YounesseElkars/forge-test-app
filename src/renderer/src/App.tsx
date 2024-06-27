import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [text, setText] = useState('http://facebook.com');
  return (
    <div>
      <Button onClick={() => window.electron.ipcRenderer.send('open-base-window', text)}>open </Button>
      <Button onClick={() => window.electron.ipcRenderer.send('show-base-window', text)}>show</Button>
      <Button onClick={() => window.electron.ipcRenderer.send('hide-base-window', text)}> hide </Button>
      <Button onClick={() => window.electron.ipcRenderer.send('remove-base-window', text)}> remove </Button>
      <Button onClick={() => window.electron.ipcRenderer.send('change-url-base-window', text)}>change url</Button>
      <Button onClick={() => window.electron.ipcRenderer.send('refresh-view', text)}>refresh view</Button>
      <br />

      <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="bg-black text-white" />
    </div>
  );
}

export default App;
