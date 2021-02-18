const db = require("../../data/db-config");


const find = () => {
    return db("schemes");
  }


const findById = (id) => {
  const schemaObject = db("schemes").where({ id }).first();
  if (!schemaObject) {
    return null;
  } else {
    return schemaObject;
  }
}


const findSteps = (id) => {
  return db("steps as st")
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .where("sc.id", id)
    .orderBy("st.step_number");
}


const add = (scheme) => {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => {
      return db("schemes").where("id", id);
    });
}


const update = (changes, id) => {
  return db("schemes").where("id", id).update(changes)
    .then(count => {
      if(count === 1) {
        return db("schemes").where("id", id)
      } else {
        return null;
      }
    })
}


const remove = (id) => {
  return db("schemes").where("id", id).del()
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}
