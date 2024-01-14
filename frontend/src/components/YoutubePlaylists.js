import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const YoutubePlaylists = () => {
  const [currentPlaylists, setCurrentPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState('');

  console.log('currentPlaylists', currentPlaylists);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/playlists`);
      const playlistIds = response.data.split(',').map(playlist => playlist.trim());
      const playlistsWithInfo = await Promise.all(playlistIds.map(id => getPlaylistInfo(id)));
      setCurrentPlaylists(playlistsWithInfo);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const getPlaylistInfo = async (playlistId) => {
    try {
      const response = await axios.get(`
        https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      const playlist = response.data.items[0];
      return {
        id: playlistId,
        info: {
          title: playlist.snippet.title,
          thumbnail: playlist.snippet.thumbnails.default.url,
        },
      };
    } catch (error) {
      console.error('Error fetching playlist info:', error);
      throw error;
    }
  };

  const handleAddPlaylist = async () => {
    try {
      const newPlaylists = playlists.split(',').map(playlist => playlist.trim());
      console.log('newPlaylists', newPlaylists);
      const validPlaylists = newPlaylists.filter(playlist => playlist.length > 0);
      console.log('validPlaylists', validPlaylists);
      if (validPlaylists.length !== 0) {
        await axios.post(`http://localhost:3001/playlists`, { playlists: validPlaylists.join(',') });
  
        await fetchPlaylists();
      }
      setPlaylists('');
    } catch (error) {
      console.error('Error adding playlist:', error);
    }
  };
  
  

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:3001/playlists/${playlistId}`);
      await fetchPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  }

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    
    <div>
      <Navbar />
      <h2>User Playlists</h2>
      <div>
        <label>Add Playlist IDs (comma-separated): </label>
        <input
          type="text"
          value={playlists}
          onChange={(e) => setPlaylists(e.target.value)}
        />
        <button onClick={handleAddPlaylist}>Add Playlist</button>
      </div>
      <p>Here are your playlists:</p>
      <div>
        {currentPlaylists.map((playlist) => (
          <div key={playlist.id}>
            <a href={`https://www.youtube.com/playlist?list=${playlist.id}`} target='_blank'>
            <h3>{playlist.info.title}</h3>
            <img src={playlist.info.thumbnail} alt={playlist.info.title} />
            </a>
            <div onClick={()=>handleDeletePlaylist(playlist.id)} style={{
              cursor: 'pointer',
            }}> X </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubePlaylists;
