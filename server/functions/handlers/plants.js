const {
  db,
} = require('../util/admin');
const config = require('../util/config');

exports.postOnePlant = (request, response) => {
  if (request.body.name.trim() === '') {
    return response.status(400).json({
      body: 'Name must not be empty'
    });
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