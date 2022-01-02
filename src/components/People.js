import Person from './Person.js'
import { useQuery } from 'react-query';

const fetchPeople = async () => {
  const res = await fetch('https://swapi.dev/api/people')
  return res.json()
}

const People = () => {
  const { data, status } = useQuery('people', fetchPeople)

  return (
    <div>
      <h2>People</h2>
      { status === 'loading' &&
      <div>Loading Data...</div>
      }
      { status === 'error' &&
      <div>Error Fetching Data</div>
      }
      { status === 'success' &&
      <div>
        { data.results.map((person, index) => <Person key={index} person={person}/>) }
      </div>
      }
    </div>
  );
}


export default People
