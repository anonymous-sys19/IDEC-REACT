const Portafolio = () => {
  const CanvaEmbed = () => {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 0,
          paddingTop: '56.2225%',
          paddingBottom: 0,
          boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
          marginTop: '1.6em',
          marginBottom: '0.9em',
          overflow: 'hidden',
          borderRadius: '8px',
          willChange: 'transform',
          background: '#d9def2ac',
        }}
      >
        <iframe
          loading="lazy"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 'none',
            padding: 0,
            margin: 0,
          }}
          src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF1ZSTruUA&#x2F;view?embed"
          allowFullScreen
          allow="fullscreen"
          
        ></iframe>
      </div>
    );
  };


  return (
    <>
      <div className="">
        <CanvaEmbed />
        <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF1ZSTruUA&#x2F;view?utm_content=DAF1ZSTruUA&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cultos Realizados apartir del Lanzamiento Oficcial de la Web
        </a>{' '}
        Greyvin Mayorga
      </div>

   
    </>
  )
}

export default Portafolio;