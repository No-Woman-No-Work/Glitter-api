## Introduction
Practice Backend with Node, create a second-hand item sales service calling Nodepop. The service maintains advertisements for the purchase or sale of articles and allows consultation and filtering by various criteria.


### Install mongoDB
> brew tap mongodb/brew
> brew update
> brew install mongodb-community@6.0


### Start mongoDB
>  brew services start mongodb/brew/mongodb-community


### Create Express project
> npm init
> npm install express mongoose

### Start the server
> node app.js


### Design the datamodel

```shell
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['find', 'sell']
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true,
        enum: ['work', 'lifestyle', 'motor', 'mobile']
    }]
});
```

### Create a connection with your MongoDB

```shell
mongoose.connect('mongodb://localhost:27017/nodepop', {useNewUrlParser: true})
```

### Define the routes for your API

```shell
productRouter.post('/', (req, res) =>{
    console.log(req.body);
    const newProduct = new Product({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        tags: req.body.tags
    })

    newProduct.save()
        .then(product => res.json(product))
        .catch(err => res.status(500).json(err))
});
```


### Definition
Add a new product

> http://localhost:3000/products

<img width="712" alt="image" src="https://user-images.githubusercontent.com/104854007/210420138-ea87db45-dd78-42a8-a108-e4149443c2d4.png">


Search for a product, including the tag and in order "desc"
http://localhost:3000/products?tags=motor,mobile&sort=name&order=desc

<img width="1012" alt="image" src="https://user-images.githubusercontent.com/104854007/210420438-fefbe7e1-3f18-4ce0-b147-177231bd6bd3.png">


List of tags available
http://localhost:3000/tags

<img width="718" alt="image" src="https://user-images.githubusercontent.com/104854007/210420618-7ba285ce-dd35-42b7-b502-58e033e852d2.png">
