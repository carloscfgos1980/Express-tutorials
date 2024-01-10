**Node.js and Express.js - Complete Course for Beginners | Learn Node.js in 6 Hours**

https://www.youtube.com/watch?v=ekRpc5YgVZU&t=15091s

- Starting at 4:20 hr
  npn init -y
  npm i express
  npm i --save-dev nodemon
  npm i dotenv
  npm express-asynce-handler
  npm i mongoose
  npm i bcrypt

  npm i jsonwebtoken

- This is what is was confused in the previous tutorial

- Malvia uses Thunder Client inside VSCode to test the app but I use POSTMan instead.

- app.use(express.json()); This middleware is necessary in order to accept data from the client in JSON format

**4:43. Explanation of the custum made middleware to hanlde the errors**
This part is handle in this 3 files:
constants.js
middleware/errorHandler.js
server.js

N: This middleware is use un the button, after the routes are callerd in the server, that is why next is not used

**4:50 Express-async-handler**
N: This is used in order to sumply the try- catch that is used in async functions

**4:55. Explanation of setting Mongo DB Atlas and connected to the VSCode**
config/dbConnection.js will have a function to connect the to MongoDB and then this function is called from the top or server.js

N: The connectioin string is save in .env file.

**5:00 - 5:10. Create schemas and CRUDS operation**
Note: I had a bug removing the collection coz remove() is decapritcated, now is used deleteOne()!

**5:10 JWT User Authentication & Protecting routes**
N: Use of bcrypt to hash the passport

- 5:30 Explanation of JWT( JSON Web Token)

In the following website there an full explatioin of how to use JWT
https://jwt.io

- 5:33. Explanatioin of how to implement jwt. controllers/userControler.js
  -5:39. Explanation of the validationTokenHandler to use as middleware. middleware/validationToken.js

- 5:48. Explanation of how to corelate the Contact with articular User

const contactSchema = mongoose.Schema({
user_id:{
type: mongoose.Schema.ObjectId,
required: true,
ref: "User"
},

**5:52. Make the Contact route private**

1.  By using the valiateToken as a middleware over the all the contactRoute. This affect all routes
    router.use(validateToken);

2.  Pass a parameter in the find method in order to match the user that is login
    const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
    });

3.  user_id:req.user.id. will add the id of the user that is login. This data is provided by the the validateToken middleware that decodes the token.

    const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id,
    });

4.  To update or delete, we need to have a condiction that checks that is the logged user the one that is making the changes:

    if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("user does not have permission to update other user contact")
    }

contact.user_id.toString(). We have to conver the user_id into a string coz the one we get from the client is a string.

**THE END**
