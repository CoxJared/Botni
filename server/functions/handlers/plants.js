const {
  db,
} = require('../util/admin');
const config = require('../util/config');

const PLANT_TYPES = [
  'fruit', 'vegetable', 'conifers',
  'cactus', 'embryopohyte', 'moss', 'seed plants', 'liverworts'
]

exports.postOnePlant = (request, response) => {
  if (request.body.name.trim() === '') {
    return response.status(400).json({
      body: 'Name must not be empty'
    });
  }
  if (!PLANT_TYPES.includes(request.body.type)) {
    return response.status(400).json({
      body: `Type not allowed, Allowable types are: ${PLANT_TYPES.join(', ')}`
    })
  }

  const plantImagePlaceholder = 'botni-logo.png'

  const newPlant = {
    name: request.body.name,
    type: request.body.type,
    createdAt: new Date().toISOString(),
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${plantImagePlaceholder}?alt=media`
  }

  db
    .collection('plants')
    .add(newPlant)
    .then((doc) => {
      const responsePlant = newPlant;
      responsePlant.plantId = doc.id;
      response.json(responsePlant);
    })
    .catch((err) => {
      response.status(500).json({
        error: 'Something went wrong!'
      });
      console.error(err);
    });
}

exports.getAllPlants = (request, response) => {
  db
    .collection('plants')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let plants = [];
      data.forEach(doc => {
        plants.push({
          name: doc.data().name,
          type: doc.data().type,
          createdAt: doc.data().createdAt,
          imageUrl: doc.data().imageUrl
        });
      })
      return response.json(plants);
    })
    .catch(err => {
      console.err(err)
      return response.status(400).json({
        error: 'Could not get plants'
      });
    });
}