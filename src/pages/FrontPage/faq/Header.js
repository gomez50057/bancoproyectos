
import { useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const imgBasePath = "/img/";
  const txtRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (txtRef.current) {
      txtRef.current.classList.add('fade-in');
    }
    if (imgRef.current) {
      imgRef.current.classList.add('fade-in');
    }
  }, []);



  return (
    <div id="header" className="header-container">
      <div className="background-svg" />
      <div className="content_header">
        <div className="header_txt fade-in-target" ref={txtRef}>
          <img src={`${imgBasePath}headertxt.png`} alt="img_representativa" />
        </div>

        <div className="header_img fade-in-target" ref={imgRef}>
          <img src={`${imgBasePath}headerimg.png`} alt="img_representativa" className="floating-img" />
        </div>
      </div>
    </div>
  );
};

export default Header;
