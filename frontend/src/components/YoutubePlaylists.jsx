import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const fetchVideosFromPlaylist = async (playlistId, nextPageToken = '') => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'snippet',
        playlistId,
        key: API_KEY,
        maxResults: 3,
        pageToken: nextPageToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

const Videos = ({ playlistId }) => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchVideosFromPlaylist(playlistId);
        setVideos(data.items);
        setNextPageToken(data.nextPageToken);
      } catch (error) {
        console.log('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [playlistId]);

  const handleShowMore = async () => {
    try {
      const data = await fetchVideosFromPlaylist(playlistId, nextPageToken);
      setVideos((prevVideos) => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error('Error fetching more videos:', error);
    }
  };
  return (
 
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    }}>
      {videos.map((video) => (
      <div key={video.id}>
        <div style={{
          marginBottom: '1rem',
        }}>{video.snippet.title}</div>
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
            title={video.snippet.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
         </div>
      ))}
        {nextPageToken && (
          <button onClick={handleShowMore} style={{
            width: 'fit-content',
            alignSelf: 'center',
          }}>Show More</button>
      )}
    </div>

  );
};

const YoutubePlaylists = () => {
  const [currentPlaylists, setCurrentPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState('');

  const fetchPlaylists = async () => {
    try {
      console.log('fetching playlists');
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
      const validPlaylists = newPlaylists.filter(playlist => playlist.length > 0);
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
      = <h2 style={{ color: '#3a9b96',display: 'flex',flexDirection:"column", alignItems: 'center', justifyContent: 'center' }}>User Playlists</h2>
      <div>
        <label>Add Playlist IDs (comma-separated): </label>
        <input
          type="text"
          value={playlists}
          onChange={(e) => setPlaylists(e.target.value)}
        />
        <button onClick={handleAddPlaylist}>Add Playlist</button>
      </div>
      <h3>Here are your playlists:</h3>
      <div>
        {currentPlaylists.map((playlist, index) => (
          <div key={playlist.id} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems:'center',
            borderBottom: '1px solid black',
            marginBottom: '2rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '1.2em',  
              color: 'blue',  
              
            }}>    
            <div> Playlist {index + 1}: 
            <a 
            href={`https://www.youtube.com/playlist?list=${playlist.id}`}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '1.2em',  
              color: 'blue',  
              textDecoration: 'underline', 
            }}
          >
            {playlist.info.title}</a></div>
              
            <div style={{
              color: 'red',
              cursor: 'pointer',

             }}
              onClick={()=>handleDeletePlaylist(playlist.id)}>Delete this playlist</div>
            </div>
            <Videos playlistId={playlist.id} />
            <br/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubePlaylists;
