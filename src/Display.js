import React from "react";

const Display = (props) => {
  //Deconstruct the dogs from props
  const {dogs} = props

  //Returns the JSX for when you have dogs
  //mapping over the dogs below
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {dogs.map((dog) => (
        <article key={dog._id}>
          <img src={dog.img}/>
          <h1>{dog.name}</h1>
          <h3>{dog.age}</h3>
          <button onClick={() => {
            props.selectDog(dog)
            props.history.push("/edit")
          }}>
            edit
            </button>
            <button onClick={() => {
            props.deleteDog(dog)
          }}>
            Delete
          </button>
        </article>
      ))}
    </div>
  )

  const loading = () => <h1>Loading!..</h1>

  Display ? loaded() : loading()
  return dogs.length > 0 ? loaded() : loading()
};


export default Display;


// const Dog = require("../models/dog");
// const { Router } = require("express");
// const router = Router();

// //index route
// router.get("/", async (req, res) => {
//   res.json(await Dog.find({}));
// });

// //create route
// router.post("/", async (req, res) => {
//   res.json(await Dog.create(req.body));
// });

// //update route
// router.put("/:id", async (req, res) => {
//   res.json(await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true }));
// });

// //delete route
// router.delete("/:id", async (req, res) => {
//   res.json(await Dog.findByIdAndRemove(req.params.id));
// });

// // EXPORT ROUTER
// module.exports = router;