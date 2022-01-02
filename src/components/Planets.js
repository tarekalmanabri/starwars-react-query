import Planet from './Planet'
import { useQuery } from 'react-query';
import { useState } from 'react';

const fetchPlanets = async (num) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${num}`)
  return res.json()
}

const Planets = () => {
  const [page, setPage] = useState(1)

  /*useQuery takes 3 args a key string function to know what to do,
   and optional config object that we can see in the query devtools*/
  const { data, status } = useQuery('planets', () => fetchPlanets(page), {
    staleTime: 1000,
  })

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>

      { status === 'loading' &&
        <div>Loading Data...</div>
      }
      { status === 'error' &&
        <div>Error Fetching Data</div>
      }
      { status === 'success' &&
        <div>
          { data.results.map((planet, index) => <Planet key={index} planet={planet}/>) }
        </div>
      }
    </div>
  );
}


export default Planets


