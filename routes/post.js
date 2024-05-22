const express = require('express');
const router = express.Router();

module.exports = (params) => {

  const { postController } = params;

  router.post('/', (requete, reponse) => {
    
    
    postController.addPost(requete.body);
    
    reponse.redirect('/');
  })
  return router;
};

  