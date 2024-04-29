export default function Image({ src, ...rest }) {
    src =
      src && src.includes('https://')
        ? src
        : 'http://localhost:3000/uploads/' + src;
  
    const onError = (e) => {
      console.error('Error loading image:', e.target.src);
    };
  
    return <img {...rest} src={src} alt={''} onError={onError} />;
  }