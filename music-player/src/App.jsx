import MusicPlayer from './components/musicPlayer';

function App() {
  const audioFile = 'acorda-pedrinho.mp3';

  return (
    <main className="flex items-center justify-center h-screen bg-violet-900">
      <div className="flex gap-4">
        <MusicPlayer className="" src={audioFile} style={{ minWidth: '40%' }} />
        <div className="flex flex-col gap-4">
          <MusicPlayer className="" src={audioFile} stack />
          <MusicPlayer className="" src={audioFile} hideProgress stack />
        </div>
      </div>
    </main>
  );
}

export default App;
