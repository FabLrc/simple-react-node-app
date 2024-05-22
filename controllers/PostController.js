const fs = require('fs');

class PostController{

  addPost(post){

    fs.readFile('./data/posts.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Erreur de lecture du fichier posts.json', err);
      }
      else {
        let posts = JSON.parse(data).posts;
        post.id = posts.length + 1;
        posts.push(post);
        fs.writeFile('./data/posts.json', JSON.stringify({posts}), (err) => {
          if (err) {
            console.error('Erreur d\'écriture du fichier posts.json', err);
          }
        });
      }
    });

  }

}

module.exports = PostController;