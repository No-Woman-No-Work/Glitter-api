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
    email: 'hello_sil@gmail.com',
    password: '123456',
    following: []
  });
  await user1.save();

  const user2 = new User ({
    _id: new ObjectId(),
    username: 'mari',
    email: 'hello_mari@gmail.com',
    password: '123456',
    following: [user1._id]
  });
  await user2.save();

  const user3 = new User ({
    _id: new ObjectId(),
    username: 'mollete',
    email: 'hello_mollete@gmail.com',
    password: '123456',
    following: [user2._id, user1._id]
  });
  await user3.save();

  const user4 = new User ({
    _id: new ObjectId(),
    username: 'muki',
    email: 'hello_muki@hotmail.com',
    password: '123456',
    following: [user2._id, user1._id, user3._id]
  });
  await user4.save();

  const user5 = new User ({
    _id: new ObjectId(),
    username: 'neli',
    email: 'hello_neli@gmail.com',
    password: '123456',
    following: [user2._id, user1._id, user3._id]

  });
  await user5.save();
  
  
  users = [user1, user2, user3, user4, user5];

  console.log(`Created ${users.length} users.`)
}

async function initTweets() {

  // borrar todos los documentos de la colección de Tweets
  const resultTweets = await Tweet.deleteMany();
  console.log(`Deleted ${resultTweets.deletedCount} tweets.`);

  // crear Tweets iniciales
  const inserted = await Tweet.insertMany([
    {
      text: "I love coding!",
      imagePath: "",
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
      imagePath: "",
      publishDate: Date.now(),
      author: users[1]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    },
    {
      text: "Express is the best backend framework!",
      imagePath: "",
      publishDate: Date.now(),
      author: users[2]._id,
      kudos: [
        users[1]._id,
        users[2]._id
      ]
    },
    {
      text: "MongoDB is my favorite database!",
      imagePath: "/uploads/working.webp",
      publishDate: Date.now(),
      author: users[3]._id,
      kudos: [
        users[2]._id
      ]
    },
    {
      text: "Be proud of who you are",
      imagePath: "/uploads/orgullo.webp",
      publishDate: Date.now(),
      author: users[4]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    },
    {
      text: "Look mum I have an image",
      imagePath: "/uploads/zebra.webp",
      publishDate: Date.now(),
      author: users[4]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    },
    {
      text: "Ola ke ase",
      imagePath: "/uploads/olakease.jpg",
      publishDate: Date.now(),
      author: users[0]._id,
      kudos: [
        users[2]._id,
        users[3]._id,
        users[4]._id
      ]
    },
    {
      text: "Love yourself first, because that´s who you´ll be spending the rest of your life with.",
      imagePath: "/uploads/love.jpg",
      publishDate: Date.now(),
      author: users[1]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    },
    {
      text: "Codes all day long in javascript... Code doesn´t run:",
      imagePath: "/uploads/foreveralone.jpg",
      publishDate: Date.now(),
      author: users[2]._id,
      kudos: [
        users[1]._id,
        users[2]._id
      ]
    },
    {
      text: "Whoooops... Sorry! I forgot doing git pull",
      imagePath: "/uploads/firegirl.jpg",
      publishDate: Date.now(),
      author: users[3]._id,
      kudos: [
        users[2]._id
      ]
    },
    {
      text: "I´m so proud of working together my friend!",
      imagePath: "/uploads/codingGirls.jfif",
      publishDate: Date.now(),
      author: users[4]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    },
    {
      text: "Come on! ",
      imagePath: "/uploads/bravekid.jpg",
      publishDate: Date.now(),
      author: users[4]._id,
      kudos: [
        users[1]._id,
        users[3]._id
      ]
    }
  ]);
  console.log(`Created ${inserted.length} tweets.`);
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
