const express = require('express');
const router = express.Router();

const postRoute = require('./post');

module.exports = (params) => {

  const { blogController } = params;

  router.all('/', async (requete, reponse) => {
    const posts = await blogController.getPosts();

    reponse.render('layouts', { pageTitle: 'Accueil', page: 'index', posts });
  });

  router.use('/post', postRoute(params));

  return router;
};
