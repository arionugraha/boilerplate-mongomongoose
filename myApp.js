require("dotenv").config();

const { query } = require("express");
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
//   {name: "Poldo", age: 25, favoriteFoods: ["Pizza", "Steak"]}
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

// findPeopleByName("Ario Dhanu", (err, data) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) {
      return done(err)
    }
    done(null, data);
  });
};

// findOneByFood("Steak", (err, data) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// })

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
}

const findEditThenSave = (personId, done) => {
  const newFood = "hamburger";
  findPersonById(personId, (err, person) => {
    if (err) {
      return done(err);
    }
    person.favoriteFoods.push(newFood);
    person.save((err, data) => {
      if (err) {
        return done(err);
      }
      console.log(person.favoriteFoods);
      done(null, data);
    })
  });
};

// findEditThenSave("64ee2a79e3c95904a442c588", (err, data) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {$set: {age: ageToSet}}, {new: true, useFindAndModify: false}, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

// findAndUpdate("Poldo", (err, data) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, {useFindAndModify: false}, (err, data) => {
    if (err) {
      return done(err);
    }
    console.log(data);
    done(null, data);
  });
};

// removeById("64ee2c27d1373800146053e6", (err, data) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// })

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) {
      return done(err)
    }
    done(null, data);
  });
};

// removeManyPeople((err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: -1}).limit(2).select({age: 0}).exec((err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

queryChain((err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
})

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
