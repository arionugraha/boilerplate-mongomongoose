require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Ario Dhanu",
    age: 21,
    favoriteFoods: ["Nasi Goreng", "Bakso"] 
  })

  person.save((err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

// createManyPeople([
//   {name: "Ario Dhanu", age: 21, favoriteFoods: ["Nasi Goreng", "Bakso"]},
//   {name: "Robert", age: 30, favoriteFoods: ["Steak"]},
// ], (err, data) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

findPeopleByName("Ario Dhanu", (err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) {
      return done(err)
    }
    done(null, data);
  });
};

findOneByFood("Steak", (err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
})

// const findPersonById = async (personId) => {
//   try {
//     const person = await Person.findById(personId);
//     return person;
//   } catch (err) {
//     console.log(err);
//   }
// };

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
}

findPersonById("64ee2a79e3c95904a442c588", (err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
