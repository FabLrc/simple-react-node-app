const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class BlogController {
  constructor(data){
    this.dataFile = `./data/${data}.json`
  }

  async loadPosts() {
    const data = await readFile(this.dataFile, 'utf-8');
    return JSON.parse(data).posts;
  }

  async getPosts() {
    const data = await this.loadPosts();

    //trier du plus récent au plus ancien par l'id
    data.sort((a, b) => {
      return b.id - a.id;
    });

    return data.map(post => {
      return {
        id: post.id,
        titre: post.titre,
        contenu: post.contenu,
        autheur: post.autheur
      }
    })
  }

    getData() {
    return this.data
  }
}

module.exports = BlogController;