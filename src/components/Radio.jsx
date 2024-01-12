/* eslint-disable react/prop-types */
// RadioPlayer.js
// RadioPlayer.js
import  { useRef, useEffect } from 'react';

const RadioPlayer = ({ plsUrl }) => {
  const audioRef = useRef();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(plsUrl);
        const data = await response.text();
        const lines = data.split('\n');
        let audioUrl = null;

        for (const line of lines) {
          if (line.startsWith('File1=')) {
            audioUrl = line.substring('File1='.length).trim();
            break;
          }
        }

        if (audioUrl) {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioContext.createBufferSource();

          fetch(audioUrl)
            .then(response => response.arrayBuffer())
            .then(buffer => audioContext.decodeAudioData(buffer))
            .then(decodedData => {
              source.buffer = decodedData;
              source.connect(audioContext.destination);
              source.start();
            })
            .catch(error => {
              console.error('Error fetching or decoding audio:', error);
            });
        } else {
          console.error('No se pudo encontrar la URL del flujo de audio en el archivo PLS.');
        }
      } catch (error) {
        console.error('Error fetching or parsing the playlist:', error);
      }
    };

    fetchPlaylist();
  }, [plsUrl]);

  return (
    <audio ref={audioRef} controls>
      Tu navegador no soporta el elemento de audio.
    </audio>
  );
};

export default RadioPlayer;
