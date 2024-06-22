import { Button } from './components/ui/button';

function App() {
  return (
    <div>
      <Button onClick={() => window.electron.ipcRenderer.send('open-base-window')}>open base window</Button>
    </div>
  );
}

export default App;
