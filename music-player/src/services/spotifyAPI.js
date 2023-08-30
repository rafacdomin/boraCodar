import axios from 'axios';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

export const requestCredentials = async () =>
  axios.post(
    'https://accounts.spotify.com/api/token',
    `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

export default spotifyAPI;
