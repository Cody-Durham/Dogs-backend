import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  //Create a URL in a variable
  // const url = "http://localhost:4500"
  const url = "https://dogs-backend-cd.herokuapp.com"

  //Create state to hold list of dogs
  const [dogs, setDogs] = React.useState([])

  //make new variable for empty dog.. for CREATE FORM 
  const emptyDog = {
    name: '', 
    age: 0, 
    image: '', 
  }

  // Setting new state for updating each dog we're going to change/update
  const [selectedDog, setSelectedDog] = React.useState(emptyDog)

  //Get all dogs function
  const getDogs = () => {
    // making a get request from this url
    fetch(url + "/dog/")
    // use .then to take action when the response comes in (form line above)
    .then( (response) => response.json()) // this converts data into an opbjec
    .then( (data) => { // this will use the data from the response
      setDogs(data)
    })
  }
  // use effect to use (display) the data right waway
  React.useEffect( () => {
    getDogs()
  }, [])

  // handleCreate funciton =  function for when the coreate form is submitted
  const handleCreate = (newDog) => {
    fetch(url + '/dog/', {
      method: 'POST', 
      headers: { // this is like the header of a letter
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDog)// takes the json and makes it a string to send it over
    })
    .then( () => getDogs()) // this will get another set of dogs (to render) and update it
  }

  // hadleUpdate funciton for when the edit form is submitted
  const handleUpdate = (updatedDog) => {
    fetch(url + '/dog/' + updatedDog._id, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dogs)
    }) 
    .then( () => getDogs())
  }
 
  // function to sepcify which dog were updating (this is setting / updating the STATE)
  const selectDog = (dog) => {
    setSelectedDog(dog)
  }

  // Delete dog funciton to delete
  const deleteDog = (dog) => {
    fetch(url + '/dog/' + dog._id, {
      method: "delete"// this is declaring that its the delete method
    })
    .then( () => {
      getDogs()
    })
  }


  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to='/create'>
        <button>Add a doggie</button>
      </Link>
      <main>
      <Switch>
          <Route
            exact
            path="/"
            render={(routerProps) => (<Display {...routerProps} 
              dogs={dogs} // passing props
              selectDog={selectDog} // passing props
              deleteDog={deleteDog} // passing props
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(routerProps) => (
              <Form
                {...routerProps}
                label="create"
                dog={emptyDog}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(routerProps) => (
              <Form 
              {...routerProps} 
              label="update" 
              dog={selectedDog} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}



export default App;
