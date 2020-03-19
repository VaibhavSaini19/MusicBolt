const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const songs = require('../Songs');

// Gets All Members
router.get('/', (req, res) =>
  res.json({
    songs
  })
);

// Get Single Song
router.get('/:id', (req, res) => {
  const found = songs.some(song => song.id === parseInt(req.params.id));

  if (found) {
    res.json(songs.filter(song => song.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No song with the id of ${req.params.id}` });
  }
});

// Create Song
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    artist: req.body.artist,
    status: 'active'
  };

  if (!newMember.name || !newMember.artist) {
    return res.status(400).json({ msg: 'Please include a name and artist' });
  }

  songs.push(newMember);
  res.json(songs);
  // res.redirect('/');
});

// Update Song
router.put('/:id', (req, res) => {
  const found = songs.some(song => song.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    songs.forEach(song => {
      if (song.id === parseInt(req.params.id)) {
        song.name = updMember.name ? updMember.name : song.name;
        song.artist = updMember.artist ? updMember.artist : song.artist;

        res.json({ msg: 'Song updated', song });
      }
    });
  } else {
    res.status(400).json({ msg: `No song with the id of ${req.params.id}` });
  }
});

// Delete Song
router.delete('/:id', (req, res) => {
  const found = songs.some(song => song.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Song deleted',
      songs: songs.filter(song => song.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No song with the id of ${req.params.id}` });
  }
});

module.exports = router;