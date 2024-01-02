// import { useState } from 'react';

// const useBusquedaSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = () => {
//     const iframe = document.getElementById('searchIframe');
//     if (iframe) {
//       // Actualiza el atributo src del iframe con la URL de búsqueda
//       iframe.src = `https://bible.knowing-jesus.com/Espa%C3%B1al/words/${searchTerm}`;
//     }
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return { searchTerm, handleSearch, handleInputChange };
// };

// export default useBusquedaSearch;

// hooks.jsx
// hooksSearch.jsx
// hooksSearch.jsx
import { useState } from 'react';

const useBusquedaSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (history) => {
    if (searchTerm.trim() !== '') {
      history.push(`/search?term=${searchTerm}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return { handleSearch, handleInputChange };
};

export default useBusquedaSearch;
