var express = require('express');
var router = express.Router();

const films = [
  {
    id: 1,
    title: 'Star Wars: The Phantom Menace (Episode I)',
    duration: 136,
    budget: '115',
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace',
  },
  {
    id: 2,
    title: 'Star Wars: Episode II – Attack of the Clones',
    duration: 142,
    budget: 115,
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_II_%E2%80%93_Attack_of_the_Clones',
  },
  {
    id: 3,
    title: "Zack Snyder's Justice League",
    duration: 242,
    budget: 70,
    link: 'https://en.wikipedia.org/wiki/Zack_Snyder%27s_Justice_League',
  },
];

// Read all the films
router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query?.['minimum-duration']
    ? Number(req.query['minimum-duration'])
    : undefined;

  if (minimumFilmDuration === undefined) return res.json(films);

  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.json('Wrong minimum duration'); // bad practise (will be improved in exercise 1.5)

  const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
});


router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404); 

  res.json(films[indexOfFilmFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim().length !== 0 ? req.body.title : undefined;
  const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;
  const duration = typeof req?.body?.duration!== 'number' || req.body.duration < 0 ? undefined : req.body.duration;
  const budget = typeof req?.body?.budget !== 'number' || req.body.budget <0 ? undefined : req.body.budget;

  console.log('POST /films');

  if (!title || !link || !duration || !budget) return res.sendStatus(400);

  const existingFilm = films.find(
    (film) => film.title.toLowerCase() === title.toLowerCase());
  if (existingFilm) return res.sendStatus(409);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = { id: nextId, title, link, duration, budget };

  films.push(newFilm);

  return res.json(newFilm);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const foundIndex = films.findIndex((film) => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromfilms = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromfilms[0];

  res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;


  if (
    !req.body || 
    (title !==undefined && title.trim())||
    (link !==undefined && link.trim())||
    (duration!== undefined && (typeof req?.body?.duration !== 'number'||duration <0)) ||
    (budget!== undefined && (typeof req?.body?.duration !== 'number'||budget <0))
  )    
    return res.sendStatus(400);

  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const filmPriorToChange = films[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  films[indexOfFilmFound] = updatedFilm;

  return res.json(updatedFilm);
});


// Update a film only if all properties are given or create it if it does not exist and the id is not existant
router.put('/:id', function (req, res) {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const id = req.params.id;
  const indexOfFilmFound = films.findIndex((film) => film.id == id);

  if (indexOfFilmFound < 0) {
    const newFilm = { id, title, link, duration, budget };
    films.push(newFilm);
    return res.json(newFilm);
  }

  const filmPriorToChange = films[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  films[indexOfFilmFound] = updatedFilm;

  return res.json(updatedFilm);
});




module.exports = router;