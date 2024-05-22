const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;
const router = require('./routes/index');
const app = express();
const BlogController = require('./controllers/BlogController');
const blogController = new BlogController("posts");
const PostController = require('./controllers/PostController');
const postController = new PostController();

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

fs.readFile(path.join(__dirname, './data/config.json'), 'utf8', (err, data) => {

  if (err) {
    console.error('Erreur de lecture du fichier config.json', err);
  }
  else {
    app.locals.siteName = JSON.parse(data).siteName;
    app.locals.posts = JSON.parse(data).posts;
  }
});

app.use((requete, reponse, suivant) => {
  console.log(`Requête reçue : ${requete.method} : ${requete.url}`);
  suivant();
});
app.use('/', router({blogController, postController}));

app.listen(port, () => {
  console.log(`Le serveur est démarré via nodemon sur http://localhost:${port}`);
});