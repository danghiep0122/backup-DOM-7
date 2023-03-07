import axios from 'axios';
import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';

export default function TvShow() {
  const [keyWord, setKeyWord] = useState('');
  const [btnClick, setBtnClick] = useState(false);
  const [allResults, setAllResults] = useState([]);

  const getResults = async () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/person?api_key=2feceab83c679d844299e10bff5e391c&language=en-US&query=${debounce}&page=1&include_adult=false`
      )
      .then((res) => setAllResults(res.data.results))
      .catch((error) => console.error(error));
  };

  const debounce = useDebounce(keyWord, 1000);
  const handleClick = (e) => {
    e.preventDefault();
    setKeyWord('');
    getResults();
    setBtnClick(true);
  };
  console.log(allResults);

  useEffect(() => {
    if (debounce.trim() === '') {
      return;
    }
    console.log(debounce);
  }, [debounce]);
  return (
    <main style={{ display: 'flex', justifyContent: 'center' }}>
      <form action="">
        <input value={keyWord} onChange={(e) => setKeyWord(e.target.value)} type="text" />
        <p>{debounce}</p>
        <button disabled={debounce.trim() === '' ? true : false} onClick={handleClick}>
          search
        </button>
      </form>
      <section>
        <div className="result">
          <ul>
            {allResults.map((result) => (
              <li key={result.id}>
                <h3>{result.name}</h3>
                <p>{result.known_for_department}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={btnClick ? 'on' : 'off'}>{allResults.length === 0 ? 'No Results' : ''}</div>
      </section>
    </main>
  );
}
