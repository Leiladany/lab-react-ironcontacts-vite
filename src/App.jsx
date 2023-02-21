import {useState} from 'react'
import './App.css'
import contacts from './contacts.json'

// Show 5 actors

const actorsFiveMax = contacts.splice(0, 5)

function App() {
  const [actors, setActors] = useState(actorsFiveMax)
  let copyArray = [...actors]

  // Add random contacts

  const addRandomContact = () => {

    let randomContact =
      contacts[Math.floor(Math.random() * contacts.length) + 5]

    let existIn = contacts.indexOf(randomContact);

    if (randomContact) {
      copyArray.unshift(randomContact);
    }
    
    if (existIn > -1) {
      contacts.splice(existIn, 1);
    }

    setActors(copyArray)
  }

  // Sort by popularity

  const sortByPopularity = () => {
    copyArray.sort(function (a, b) {
      return b.popularity - a.popularity;
    })
    setActors(copyArray)
  }

  // Sort by name

  const sortByName = () => {
    copyArray.sort((a, b) => a.name.localeCompare(b.name));
    setActors(copyArray)
  }

  // Delete

  const deleteActor = (actorID) => {
    setActors(actors.filter((c) => c !== actorID));
  }

  return (
    <div className="App">
    <h1>Ironcontacts</h1>
    <button onClick={addRandomContact}>Add random contact</button>
    <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <table className="tableActors">
        <thead>
          <tr className='title'>
            <th> Picture </th>
            <th> Name </th>
            <th> Popularity </th>
            <th> Won Oscar</th>
            <th> Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {actors.map((actor) => {
            return (
              <tr key={actor.id}>
                <td>
                  <img
                    src={actor.pictureUrl}
                    alt="Actor"
                  />
                </td>
                <td> {actor.name} </td>
                <td> {Number(actor.popularity).toFixed(1)}</td>
                <td>{actor.wonOscar ? "🏆" : ""}</td>
                <td>{actor.wonEmmy ? "⭐" : ""}</td>
                <td>

                {/* Can't make it work */}

                  <button
                    onClick={() => {
                      deleteActor(actor.id);
                    }}
                    id={actor.id}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default App