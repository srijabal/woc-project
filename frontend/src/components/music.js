import React, { useState } from 'react';
import Navbar from './Navbar';

import "./music.css";

const playlists = [
  { id: '37i9dQZF1DX8Uebhn9wzrS', name: 'Chill Lofi', description: 'Gentle beats to hug your thoughts.' },
  { id: '4odWnvBgtEoV4xGK6BAZNO', name: 'Soothing Beats', description: 'Uncomplicated melodies, pure and sweet.' },
  { id: '0GXLTT5gVkPG1AAoT4hCyq', name: 'Calm Vibes', description: 'Light breezes of calmness in musical form.' },
  { id: '2jgiLjtaJFeLjhla80IIsW', name: 'Relaxing Tunes', description: '"Floating on clouds of relaxation with each beat.' },
  { id: '6OpvhaJmmbdhqjplBKUGeJ', name: 'Calm Study', description: 'Gentle tunes to accompany your focused mind.' },
];

function SpotifyMusic() {
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const currentPlaylist = playlists[currentPlaylistIndex];

  const handleTogglePlaylist = () => {
    setCurrentPlaylistIndex((prevIndex) => (prevIndex + 1) % playlists.length);
  };

  return (
    <>
    <Navbar/>
    <div className="music-container">
      <div className="playlist">
        <h2>Current Playlist: {currentPlaylist.name}</h2>
        <p>Description: {currentPlaylist.description}</p>
      </div>

      <div className="spotify-widget-container">
        <iframe
          title="Spotify Playlist"
          style={{ borderRadius: '12px' }}
          src={`https://open.spotify.com/embed/playlist/${currentPlaylist.id}`}
          width="60%"
          height="352"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      <button className="toggle-button1" onClick={handleTogglePlaylist}>
        Change Playlist
      </button>

      <p className="current-playlist-info">{`Now playing: ${currentPlaylist.name} `}</p>
    </div>
    </>
  );
}

export default SpotifyMusic;
