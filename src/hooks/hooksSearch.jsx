
// hooksSearch.jsx                                      //#Greyvin
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
