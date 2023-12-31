/* eslint-disable react/prop-types */
const  TextoConNegritaAutomatica = ({ children }) =>{

  const regex = /#\w+/g;
  // Dividir el texto en partes con y sin hashtags
  const partes = children.split(regex);
  // Extraer los hashtags
  const hashtags = children.match(regex) || [];

  // Intercalar las partes y los hashtags
  const elementosConEstilo = [];
  partes.forEach((parte, index) => {
    // No es un hashtag
    elementosConEstilo.push(<span key={index * 2}>{parte}</span>);
    // Hashtag (si existe)
    if (hashtags[index]) {
      elementosConEstilo.push(<span key={index * 2 + 1} style={{ fontWeight: 'bold' }}>{hashtags[index]}</span>);
    }
  });

  return <>{elementosConEstilo}</>;
};



export default TextoConNegritaAutomatica