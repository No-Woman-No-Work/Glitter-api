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
  
  // inicializar la colección de Tweets

  await initTweets();

  // desconectamos de la base de datos

  connection.close();
}

main().catch(err => console.log('Error', err));


async function initTweets() {

  // borrar todos los documentos de la colección de Tweets
  const resultTweets = await Tweet.deleteMany();
  console.log(`Deleted ${resultTweets.deletedCount} tweets.`);

  const resultUsers = await User.deleteMany();
  console.log(`Deleted ${resultUsers.deletedCount} users.`);

  // crear autores
  const user1 = new User ({
    _id: new mongoose.Types.ObjectId(),
    username: 'ananas',
    email: 'ananas@gmail.com',
    password: 'tururu'
  });
  user1.save();

  const user2 = new User ({
    _id: new mongoose.Types.ObjectId(),
    username: 'banana',
    email: 'banana@gmail.com',
    password: 'tarara'
  });
  user2.save();
  
  const user3 = new User ({
    _id: new mongoose.Types.ObjectId(),
    username: 'cherry',
    email: 'cherry@gmail.com',
    password: 'tiriri'
  });
  user3.save();
    
    const user4 = new User ({
    _id: new mongoose.Types.ObjectId(),
    username: 'date',
    email: 'date@gmail.com',
    password: 'terere'
  });
  user4.save();
    
    const user5 = new User ({
    _id: new mongoose.Types.ObjectId(),
    username: 'elderberry',
    email: 'elderberry@gmail.com',
    password: 'tororo'
    });
  user5.save();


  // crear Tweets iniciales
  const inserted = await Tweet.insertMany([
    {
      text: "I love coding!",
      publishDate: new Date(),
      author: user1._id,
      kudos: [
        user2._id,
        user3._id
      ]
    },
    {
      text: "Learning Node.js is so much fun!",
      publishDate: new Date(),
      author: user2._id,
      kudos: [
        user1._id,
        user4._id
      ]
    },
    {
      text: "Express is the best backend framework!",
      publishDate: new Date(),
      author: user3._id,
      kudos: [
        user1._id,
        user2._id
      ]
    },
    {
      text: "MongoDB is my favorite database!",
      publishDate: new Date(),
      author: user4._id,
      kudos: [
        user2._id,
        user3._id
      ]
    },
    {
      text: "JWT is a great way to handle authentication!",
      publishDate: new Date(),
      author: user5._id,
      kudos: [
        user1._id,
        user3._id
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
