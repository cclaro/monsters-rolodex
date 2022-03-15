import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list-component';
import SearchBox from './components/search-box/search-box.component';

/** Functional Component */

const App = () => {
  // array destruction
  const [searchField, setSearchField] = useState('') // array of two values [value, setValue]
  const [ monsters, setMonsters ] = useState([])
  const [ filteredMonsters, settFilteredMonsters ] = useState(monsters)
  

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => setMonsters(users))
  }, [])

  useEffect(() => {
     const newFilteredMonsters = monsters.filter((monster) => {
       return monster.name.toLocaleLowerCase().includes(searchField)
     });

     settFilteredMonsters(newFilteredMonsters)

  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }


  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox className='monsters-search-box' placeholder='search monsters' onChangeHandler={onSearchChange} />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;
