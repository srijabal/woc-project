
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyAEzxCy_VMGZKeODaac8fZinAIUgWSC8ww';

const PlaylistComponent = () => {
  const [playlistIds, setPlaylistIds] = useState('');
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/playlists/${playlistIds}`);
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const handleAddPlaylist = async () => {
    try {
      await axios.post(`http://localhost:3001/playlists`, { playlistIds });
      await fetchPlaylists();
    } catch (error) {
      console.error('Error adding playlist:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []); 

  return (
    <div>
      <h2>User Playlists</h2>
      <div>
        <label>Add Playlist IDs (comma-separated): </label>
        <input
          type="text"
          value={playlistIds}
          onChange={(e) => setPlaylistIds(e.target.value)}
        />
        <button onClick={handleAddPlaylist}>Add Playlist</button>
      </div>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <a
              href={`https://www.youtube.com/playlist?list=${playlist.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {playlist.snippet.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistComponent;
