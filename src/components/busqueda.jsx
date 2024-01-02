// // busqueda.js

// import useBusquedaSearch from "../hooks/hooksSearch";

// const BusquedaSearch = () => {
//     const { searchTerm  } = useBusquedaSearch();

//     return (
//         <div>
            

//             <iframe
//                 id="searchIframe"
//                 title="Resultados de Búsqueda"
//                 width="100%"
//                 height="600"
//                 frameBorder="0"
//                 src={`https://bible.knowing-jesus.com/Espa%C3%B1al/words/${searchTerm}`}
//             ></iframe>
//         </div>
//     );
// };

// export default BusquedaSearch;

// busqueda.js

import useBusquedaSearch from '../hooks/hooksSearch';

const BusquedaSearch = () => {
  const searchTerm = useBusquedaSearch();

  return (
    <div>
      <iframe
        id="searchIframe"
        title="Resultados de Búsqueda"
        width="100%"
        height="600"
        frameBorder="0"
        src={`https://bible.knowing-jesus.com/Espa%C3%B1al/words/${searchTerm}`}
      ></iframe>
    </div>
  );
};

export default BusquedaSearch;
