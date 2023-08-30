import { useEffect, useState } from 'react';
import MusicPlayer from './components/musicPlayer';
import spotifyAPI, { requestCredentials } from './services/spotifyAPI';
import Search from './components/search';

function App() {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [audioData, setAudioData] = useState({
    preview_url: 'acorda-pedrinho.mp3',
    image: 'cover.png',
    name: 'ACORDA PEDRINHO',
    artist: 'Jovem Dionisio',
  });

  useEffect(() => {
    const setCredentials = async () => {
      const { data } = await requestCredentials();

      setToken(data['access_token']);
    };

    setCredentials();
  }, []);

  const searchMusic = async (input) => {
    const { data } = await spotifyAPI.get(`/search?q=${input}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTracks(
      data.tracks.items
        .filter((item) => item.preview_url)
        .map(({ preview_url, album, name, artists }) => ({
          preview_url,
          image: album.images[0].url,
          name,
          artist: artists.map((artist) => artist.name).join(', '),
        })),
    );
  };

  const selectMusic = ({ image, name, artist, preview_url }) => {
    setAudioData({
      preview_url,
      image,
      name,
      artist,
    });
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-violet-900">
      <Search className="w-72 lg:w-2/5 mb-10" onSearch={searchMusic} items={tracks} onSelect={selectMusic} />
      <div className="flex gap-4">
        <MusicPlayer data={audioData} style={{ minWidth: '40%' }} />
        <div className="hidden lg:flex flex-col gap-4">
          <MusicPlayer data={audioData} stack />
          <MusicPlayer data={audioData} hideProgress stack />
        </div>
      </div>
    </main>
  );
}

export default App;
