import { useState } from 'react';
import Poem from './Poem';

const HomePage = () => {

  const [poemTitle, setPoemTitle] = useState(``);
  const [poemTitleURL, setPoemTitleURL] = useState(``);
  const [poet, setPoet] = useState(``);
  const [poetURL, setPoetURL] = useState();
  const [poemContent, setPoemContent] = useState(``);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 11));
  const [hide, setHide] = useState();
  const [error, setError] = useState();



  const bgColor = [
    ['#774c60', '#eacdc2'],
    ['#ffac81', '#cdeac0'],
    ['#b26e63', '#cec075'],
    ['#A5A58D', '#FFE8D6'],
    ['#c5dedd', '#fde2e4'],
    ['#7d4f50', '#f9eae1'],
    ['#136f63', '#ffcb69'],
    ['#b0d0d3', '#f7af9d'],
    ['#ffcad4', '#b8bedd'],
    ['#52796f', '#bee3db'],
    ['#89b0ae', '#d9d9d9']
  ]

  const getAPI = async () => {
    await fetch('https://www.poemist.com/api/v1/randompoems', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        setPoemTitle(data[0].title);
        setPoemTitleURL(data[0].url)
        setPoet(data[0].poet.name);
        setPoetURL(data[0].poet.url);
        setPoemContent(data[0].content);
        setHide(true);
      })
      .catch((error) => {
        console.log(error);
        setHide(true);
        setError(true);
      })
  };


  return (
    <div className="wrapper" style={{ backgroundImage: `linear-gradient(to right bottom, ${bgColor[randomNum][0]} , ${bgColor[randomNum][1]})` }}>

      <div className="header" style={hide ? { display: `none` } : {}}>
        <h1 className="header__welcome">Welcome</h1>
        <h2 className="header__greeting">Click the botton to get your daily poem.</h2>
        <button className="btn btn__getAPI" onClick={getAPI}>Get daily poem</button>
        <p className="header__copyright">copyright by ya-ping</p>
      </div>
      <div className="error" style={error ? { display: `block` } : { display: `none` }}>OOPS! It seems there's some error, please try again later.</div>

      <Poem
        poemTitle={poemTitle}
        poemTitleURL={poemTitleURL}
        poet={poet}
        poetURL={poetURL}
        poemContent={poemContent}
        hide={hide}
        setHide={setHide}
        setError={setError}
      />
    </div>

  )

}

export default HomePage;