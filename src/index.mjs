//KnnYHRo6XAwhxklo
//index.mjs

import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from 'express-session';
import passport from "passport";
import mongoose from "mongoose";
import "./strategies/local-strategy.mjs";

const app = express();

mongoose
.connect("mongodb+srv://Express_1:KnnYHRo6XAwhxklo@express.u9j6h.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use
 (session({
   secret:"anson the dev",
   saveUninitialized:false,
   resave:false,
   cookie:{
    maxAge: 60000 * 60,
   },
 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post("/api/auth", passport.authenticate("local"),
 (request, response) => {
   response.sendStatus(200);
});

app.get("/api/auth/status", (request, response) => {
    console.log(`Inside /auth/status endpoint`);
    console.log(request.user);
    console.log(request.session); // Fixed typo: Changed 'Console' to 'console'
    return request.user ? response.send(request.user) : response.sendStatus(401);

  });
  

app.post("/api/auth/logout", (request, response) => {
    if(!request.user) return response.sendStatus(401);

    request.logout((err)=>{
        if(err) return response.sendStatus(401);
        response.send(200);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT ,() => {
    console.log(`Running on port ${PORT}`);
});


// //localhost:3000
// //localhost:3000/users
// //localhost:3000/products?key=value&key2=value2
// //http://localhost:3000/api/users?filter=username&value=ja
 







