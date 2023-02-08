// Inicializar la base datos con los datos mínimos para funcionar

const readline = require('readline');
const cors = require('cors')

// usamos cors
app.use(cors())

// cargamos los modelos

const Tweet = require('./models/tweet');
const User = require('./models/user');
const mongoose = require('mongoose');
const app = require('./app');



async function main() {

  // preguntar al usuario si está seguro
  const nextStep = await question('Do you want to delete the database? [y/n]')
  if (!nextStep) {
    process.exit();
  }


  // conectar a la base de datos
  mongoose.set('strictQuery', false);


  mongoose.connection.on('error', err => {
    console.log('Error de conexión a MongoDB', err);
    process.exit(1);
  });


  mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
  });


  mongoose.connect('mongodb://127.0.0.1:27017/flitter', {useNewUrlParser: true}) // revisar que no sea 'mongodb://127.0.0.1:27017/flitter'


  // inicializar la colección de Tweets
  await initTweets();

  // desconectamos de la base de datos
  mongoose.connection.close();
}


main().catch(err => console.log('Error', err));


async function initTweets() {

  // borrar todos los documentos de la colección de Tweets
  const result = await Tweet.deleteMany();
  console.log(`Eliminados ${result.deletedCount} Tweets.`);

  // crear autores
  const user = new User ({
    _id: new mongoose.Types.ObjectId(),
    username: 'ananas',
    email: 'ananas@gmail.com',
    password: 'tuculo'
  });
  
  user.save(function(err){
    if (err) {
      return handleError (err);
    }
  });


  // crear Tweets iniciales
  const inserted = await Tweet.insertMany([
    {
      text: "I love coding!",
      publishDate: new Date(),
      author: user._id,
      // kudos: [
      //   "6a1b6c6d6e6f6g6h6i6j6k",
      //   "7x1y7z7a7b7c7d7e7f7g7h"
      // ]
    }
    // {
    //   text: "Vue.js is my favorite frontend framework!",
    //   publishDate: new Date(),
    //   author: "6a1b6c6d6e6f6g6h6i6j6k",
    //   kudos: [
    //     "5f1c5d5e5f5g5h5i5j5k5l",
    //     "7x1y7z7a7b7c7d7e7f7g7h"
    //   ]
    // },
    // {
    //   text: "Node.js is amazing for backend development!",
    //   publishDate: new Date(),
    //   author: "7x1y7z7a7b7c7d7e7f7g7h",
    //   kudos: [
    //     "5f1c5d5e5f5g5h5i5j5k5l",
    //     "6a1b6c6d6e6f6g6h6i6j6k"
    //   ]
    // }
  ]);
  console.log(`Created ${inserted.length} tweets.`)
}


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
