import { useState, useEffect } from 'react';

const Poem = ({
  poemTitle,
  poemTitleURL,
  poet,
  poetURL,
  poemContent,
  hide,
  setHide,
  setError }) => {

  const [split, setSplit] = useState([]);

  useEffect(() => {
    const splitPoem = () => {
      let str = poemContent.split('\n');
      if (poemContent.includes(`&amp;`)) {
        let withAndContent = poemContent.replaceAll('&amp;', '&');
        let otherStr = withAndContent.split('\n');
        let tempSplit = Object.keys(otherStr).map((key) => [otherStr[key]]);
        setSplit(tempSplit);
      } else {
        let tempSplit = Object.keys(str).map((key) => [str[key]]);
        setSplit(tempSplit);
      }
    }
    splitPoem();
  }, [poemContent, hide]);




  const backForward = () => {
    setHide(false);
    setError(false);
  }



  return (
    <>
      <div className="poem" style={hide ? {} : { display: `none` }}>
        <button className="btn btn__forward" onClick={backForward}>&lt; Back to HomePage</button>
        <h1 className="poem__header"><a href={poemTitleURL} className="poem__url" target="_blank" rel="noreferrer noopener">{poemTitle}</a></h1>
        <h2 className="poem__poet"><a href={poetURL} className="poem__url" target="_blank" rel="noreferrer noopener">{poet}</a></h2>
        <ul className="poem__content">
          {split.map((sentence, index) => {
            return (
              <li key={index}>{sentence}</li>
            )
          })}
        </ul>
        <p className="paragraph paragraph--info">You can click title or poet<br />to get more information.</p>
        <p className="paragraph paragraph--API">API from <a href="https://poemist.github.io/poemist-apidoc/#introduction" className="poem__url" target="_blank" rel="noreferrer noopener">Poemist API</a></p>
      </div>
    </>
  )
}

export default Poem;