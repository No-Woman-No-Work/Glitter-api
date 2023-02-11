// una opcion create tweets simulando inicio de sesion
async function createTweets() {
        // Recorremos la lista de usuarios
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
        
          // Simulamos el inicio de sesión del usuario
          const jwtInfo = jwt.sign({ id: user._id, email: user.email }, 'flitter');
        
          // Crear 5 tweets para el usuario actual
          for (let j = 0; j < 5; j++) {
            const tweet = new Tweet({
              _id: new ObjectId(),
              text: `Este es el tweet ${j + 1} del usuario ${user.username}.`,
              publishDate: Date.now(),
              author: user._id,
            });
        
            // Guardar el tweet en la base de datos
            tweet.save();
          }
        }
}

// COMO FUNCIONA 
// Inicializar la base datos con los datos mínimos para funcionar

const readline = require('readline');

// cargamos los modelos

const Tweet = require('./models/tweet');
const User = require('./models/user');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const ObjectId = mongoose.Types.ObjectId



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
    _id: new ObjectId(),
    username: 'sil',
    email: 'pescadorlopezsilvia@gmail.com',
    password: '123456',
  });

  user1.jwtInfo = jwt.sign({ id: user1._id, email: user1.email }, 'flitter')

  const user2 = new User ({
    _id: new ObjectId(),
    username: 'mari',
    email: 'xixiadecosta@gmail.com',
    password: '123456',
  });
  user2.jwtInfo = jwt.sign({ id: user2._id, email: user2.email }, 'flitter')

  const user3 = new User ({
    _id: new ObjectId(),
    username: 'mollete',
    email: 'pescadorlopezs@gmail.com',
    password: '123456',
  });
  
  user3.jwtInfo = jwt.sign({ id: user3._id, email: user3.email }, 'flitter')

  const user4 = new User ({
    _id: new ObjectId(),
    username: 'muki',
    email: 'silvikini@hotmail.com',
    password: '123456',
  });
  
  user4.jwtInfo = jwt.sign({ id: user4._id, email: user4.email }, 'flitter')

  const user5 = new User ({
    _id: new ObjectId(),
    username: 'neli',
    email: 'maantoana@gmail.com',
    password: '123456',
  });
  
  user5.jwtInfo = jwt.sign({ id: user5._id, email: user5.email }, 'flitter')
  
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
      publishDate: Date.now(),
      author: users[0]._id,
      kudos: [
        users[2]._id,
        users[3]._id,
        users[4]._id
      ]
    },
    {
      text: "Learning Node.js is so much fun!",
      publishDate: Date.now(),
      author: users[1]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    },
    {
      text: "Express is the best backend framework!",
      publishDate: Date.now(),
      author: users[2]._id,
      kudos: [
        users[1]._id,
        users[2]._id
      ]
    },
    {
      text: "MongoDB is my favorite database!",
      publishDate: Date.now(),
      author: users[3]._id,
      kudos: [
        users[2]._id
      ]
    },
    {
      text: "JWT is a great way to handle authentication!",
      publishDate: Date.now(),
      author: users[4]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    }
  ]);
  console.log(`Created ${inserted.length} tweets.`);
  console.log(`Created ${users.length} users.`)
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


// COMO LO ESTABA HACIENDO

// Inicializar la base datos con los datos mínimos para funcionar

const readline = require('readline');

// cargamos los modelos

const Tweet = require('./models/tweet');
const User = require('./models/user');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const ObjectId = mongoose.Types.ObjectId



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
  await createTweets()
  // await initTweets();

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
    _id: new ObjectId(),
    username: 'sil',
    email: 'pescadorlopezsilvia@gmail.com',
    password: '123456',
  });

  user1.jwtInfo = jwt.sign({ id: user1._id, email: user1.email }, 'flitter')

  const user2 = new User ({
    _id: new ObjectId(),
    username: 'mari',
    email: 'xixiadecosta@gmail.com',
    password: '123456',
  });
  user2.jwtInfo = jwt.sign({ id: user2._id, email: user2.email }, 'flitter')

  const user3 = new User ({
    _id: new ObjectId(),
    username: 'mollete',
    email: 'pescadorlopezs@gmail.com',
    password: '123456',
  });
  
  user3.jwtInfo = jwt.sign({ id: user3._id, email: user3.email }, 'flitter')

  const user4 = new User ({
    _id: new ObjectId(),
    username: 'muki',
    email: 'silvikini@hotmail.com',
    password: '123456',
  });
  
  user4.jwtInfo = jwt.sign({ id: user4._id, email: user4.email }, 'flitter')

  const user5 = new User ({
    _id: new ObjectId(),
    username: 'neli',
    email: 'maantoana@gmail.com',
    password: '123456',
  });
  
  user5.jwtInfo = jwt.sign({ id: user5._id, email: user5.email }, 'flitter')

  // save new users in database
  user1.save();
  user2.save();
  user3.save();
  user4.save();
  user5.save();
  
  users = [user1, user2, user3, user4, user5];

  // Añadimos following a los usuarios
  for (let i = 0; i < users.length; i++) {
    // seleccionamos dos usuarios aleatorios de la lista de usuarios
    let randomUser1 = users[Math.floor(Math.random() * users.length)];
    let randomUser2 = users[Math.floor(Math.random() * users.length)];

    // añadimos los dos usuarios aleatorios a la lista de "following" del usuario actual
    users[i].following.push(randomUser1._id, randomUser2._id);

    // esperamos antes de guardar el usuario actual con sus cambios (mongoDb no nos deja guardar en paralelo)
    await new Promise(resolve => setTimeout(resolve, 50));
  
    // guardamos el usuario actual con sus cambios
    await users[i].save();
  }

}

async function createTweets(req, res) {
  try {

    // borrar todos los documentos de la colección de Tweets
    const resultTweets = await Tweet.deleteMany();
    console.log(`Deleted ${resultTweets.deletedCount} tweets.`);

    // Find all users in the database
    const users = await User.find({});

    // Authenticate each user and create a tweet
    for (const user of users) {
      // Verify JWT token
      const jwtInfo = jwt.verify(user.jwtInfo, 'flitter');

      // If the token is valid, create a new tweet
      if (jwtInfo) {
        const tweet = new Tweet({
          text: `A tweet from ${user.username}`,
          publishDate: Date.now(),
          author: jwtInfo.id
        });

        // Save the tweet in the database
        await tweet.save();
      }
    }

    // Return success status
    res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error.message });
  }
}

// async function initTweets() {

//   // borrar todos los documentos de la colección de Tweets
//   const resultTweets = await Tweet.deleteMany();
//   console.log(`Deleted ${resultTweets.deletedCount} tweets.`);
//------------------------------------------------------------------
//   // crear Tweets iniciales
//   // const inserted = await Tweet.insertMany([
//   //   {
//   //     text: "I love coding!",
//   //     publishDate: Date.now(),
//   //     author: users[0]._id,
//   //     kudos: [
//   //       users[2]._id,
//   //       users[3]._id,
//   //       users[4]._id
//   //     ]
//   //   },
//   //   {
//   //     text: "Learning Node.js is so much fun!",
//   //     publishDate: Date.now(),
//   //     author: users[1]._id,
//   //     kudos: [
//   //       users[1]._id,
//   //       users[3]._id
//   //     ]
//   //   },
//   //   {
//   //     text: "Express is the best backend framework!",
//   //     publishDate: Date.now(),
//   //     author: users[2]._id,
//   //     kudos: [
//   //       users[1]._id,
//   //       users[2]._id
//   //     ]
//   //   },
//   //   {
//   //     text: "MongoDB is my favorite database!",
//   //     publishDate: Date.now(),
//   //     author: users[3]._id,
//   //     kudos: [
//   //       users[2]._id
//   //     ]
//   //   },
//   //   {
//   //     text: "JWT is a great way to handle authentication!",
//   //     publishDate: Date.now(),
//   //     author: users[4]._id,
//   //     kudos: [
//   //       users[1]._id,
//   //       users[3]._id
//   //     ]
//   //   }
//   // ]);
//   // console.log(`Created ${inserted.length} tweets.`);
//   // console.log(`Created ${users.length} users.`)
//   //_______________________________________________________________
//     // create 5 new tweets for each user
//     for (const user of users) {
//       for (let i = 0; i < 5; i++) {
//         const newTweet = new Tweet({
//           text: `Este es un nuevo tweet del usuario ${user.username}.`,
//           publishDate: Date.now(),
//           author: user.jwtInfo._id
//         });
  
//         // save new tweet in database
//         await newTweet.save();
//       }
//     }
//   }

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