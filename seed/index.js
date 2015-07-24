var models = require('../models');

var faker = require('faker');

models.sequelize
  .sync({force: true})
  .then(function(){
    // stuffs
    var galleryData = [];
    var totalEntries = faker.random.number({min:10, max: 15});
    var categories = ['food', 'people', 'sports', 'cats', 'transport'];
    for (var i = 0; i < totalEntries; i++){
      var randomCat = faker.random.arrayElement(categories);
      galleryData.push(
        {
          author: faker.name.findName(),
          link: faker.image.imageUrl(1600, 1200, randomCat),
          description: faker.lorem.sentences()
        }
        );
    }
    return models.Gallery
    .bulkCreate(galleryData);
  });
