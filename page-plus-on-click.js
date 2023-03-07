import { useEffect, useState } from 'react';

export default function TvShow() {
  const [index, setIndex] = useState(2);
  const [newList, setNewList] = useState([1]);
  const [allMovies, setAllMovies] = useState([]);
  const list = [];


  const handleClick = (index) => {
    setIndex(index + 1);
    list.push(index);
    setNewList(newList.concat(list));
    console.log(list);
  };
  useEffect(() => {
  }, [newList]);
  console.log(allMovies);
  return (
    <section>
      <div>
        {newList.map((item) => (
          <h1 key={Math.random()}>{item}</h1>
        ))}
      </div>
      <button onClick={() => handleClick(index)}>add</button>
    </section>
  );
}
