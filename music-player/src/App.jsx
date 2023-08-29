import MusicPlayer from './components/musicPlayer';

function App() {
  return (
    <main className="flex items-center justify-center h-screen bg-violet-900">
      <div className="grid grid-rows-2 grid-cols-2 gap-4">
        <MusicPlayer className="row-span-2" src="acorda-pedrinho.mp3" />
        <MusicPlayer className="row-span-2" src="acorda-pedrinho.mp3" hideProgress={true} />
        {/* <MusicPlayer className="" /> */}
      </div>
    </main>
  );
}

export default App;
