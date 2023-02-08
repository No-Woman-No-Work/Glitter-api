// Inicializar la base datos con los datos mínimos para funcionar


const readline = require('readline');


// cargamos los modelos

const Tweet = require('./models/tweet');
const User = require('./models/user');
const mongoose = require('mongoose')



async function main() {

  // preguntar al usuario si está seguro
  const nextStep = await question('Do you want to delete the database? [y/n]')
  if (!nextStep) {
    process.exit();
  }

  // conectar a la base de datos

  const connection = require('./lib/connectMongoose')
  
  // inicializar la colección de usuarios y luego la de tweets
  await initUsers()
  await initTweets();

  // desconectamos de la base de datos

  connection.close();
}

main().catch(err => console.log('Error', err));

let users = []

async function initUsers() {

      // delete all users in database
      const resultUsers = await User.deleteMany({});
      console.log(`Deleted ${resultUsers.deletedCount} users.`)

      // create 5 new users
      const user1 = new User ({
            _id: new mongoose.Types.ObjectId(),
            username: 'ananas',
            email: 'ananas@gmail.com',
            password: 'tururu'
      });
      const user2 = new User ({
            _id: new mongoose.Types.ObjectId(),
            username: 'banana',
            email: 'banana@gmail.com',
            password: 'tarara'
      });
      const user3 = new User ({
            _id: new mongoose.Types.ObjectId(),
            username: 'cherry',
            email: 'cherry@gmail.com',
            password: 'tiriri'
      });
      const user4 = new User ({
            _id: new mongoose.Types.ObjectId(),
            username: 'date',
            email: 'date@gmail.com',
            password: 'terere'
      });
      const user5 = new User ({
            _id: new mongoose.Types.ObjectId(),
            username: 'elderberry',
            email: 'elderberry@gmail.com',
            password: 'tororo'
      });

      // save new users in database
      user1.save();
      user2.save();
      user3.save();
      user4.save();
      user5.save();

      users = [user1, user2, user3, user4, user5];
}


async function initTweets() {

  // borrar todos los documentos de la colección de Tweets
  const resultTweets = await Tweet.deleteMany();
  console.log(`Deleted ${resultTweets.deletedCount} tweets.`);

  // crear Tweets iniciales
  const inserted = await Tweet.insertMany([
    {
      text: "I love coding!",
      publishDate: new Date(),
      author: users[0]._id,
      kudos: [
        users[2]._id,
        users[3]._id
      ]
    },
    {
      text: "Learning Node.js is so much fun!",
      publishDate: new Date(),
      author: users[1]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    },
    {
      text: "Express is the best backend framework!",
      publishDate: new Date(),
      author: users[2]._id,
      kudos: [
        users[1]._id,
        users[2]._id
      ]
    },
    {
      text: "MongoDB is my favorite database!",
      publishDate: new Date(),
      author: users[3]._id,
      kudos: [
        users[2]._id,
        users[3]._id
      ]
    },
    {
      text: "JWT is a great way to handle authentication!",
      publishDate: new Date(),
      author: users[4]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    }
  ]);
  console.log(`Created ${inserted.length} tweets.`);
  console.log(`Created ${User.length} users.`)
}

// función pregunta si/no a borrar la base de datos anterior

function question(text) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.question(text, answer => {
      interface.close();
      if (answer.toLowerCase() === 'y') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  })
}


