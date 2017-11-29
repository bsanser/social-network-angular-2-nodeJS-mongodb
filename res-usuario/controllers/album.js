'use strict'
var Album = require('../models/album');
var User = require('../models/user')


function getAlbum(req, res) {
  var albumId = req.params._id;
  var albumUser = req.params.user;

  Album.find({})
    .where('id').equals(albumId)
    .where('user').equals(albumUser)
    .exec((err, album) => {
      if (err)
        res.status(500).send({
          mensaje: 'error en la petición'
        })
      else {
        if (!album) {
          res.status(404).send({
            mensaje: 'el album no existe'
          })
        } else {
          User.populate(album, {
            path: 'user',
            select: '-password'
          }, (err, album) => {
            if (err)
              res.status(500).send({
                err: 'Error con el servidor2'
              })
            else {
              if (!album) {
                res.status(404).send({
                  album: 'lista de imagene2'
                })
              } else {
                res.status(200).send({
                  album: album
                })
              }
            }
          })
        }
      }
    })

}

function getAlbums(req, res) {
  var albumUser = req.params.user;
  console.log(albumUser)
  Album.find({
      'user': albumUser
    })
    .exec((err, albums) => {
      console.log(albums)
      if (err)
        res.status(500).send({
          mensaje: 'error en la petición'
        })
      else {
        if (!albums) {
          res.status(404).send({
            mensaje: 'NO hay datos'
          })

        } else {
          User.populate(albums, {
            path: 'user',
            select: '-password'
          }, (err, albums) => {
            if (err)
              res.status(500).send({
                err: 'Error con el servidor2'
              })
            else {
              if (!albums) {
                res.status(404).send({
                  user: 'lista de imagene2'
                })
              } else {
                res.status(200).send({
                  albums: albums
                })
              }
            }
          })
        }
      }
    })
}



function saveAlbum(req, res) {
  var album = new Album();
  var params = req.body;
  album.title = params.title;
  album.description = params.description;
  album.user = params.user;
  album.save((err, album) => {
    if (err)
      res.status(500).send({
        mensaje: 'error en la petición'
      })
    else {
      if (album) {
        res.status(200).send({
          album: album
        })
      } else {
        res.status(404).send({
          mensaje: 'NO hay datos'
        })
      }
    }
  })

}

function updateAlbum(req, res) {
  var id = req.params.id;

  var update = {
    title: req.body.title,
    description: req.body.description
  }
  console.log(update);
  Album.findByIdAndUpdate(id, update, (err, album) => {
    if (err)
      res.status(500).send({
        mensaje: 'error en la petición'
      })
    else {
      if (album) {
        res.status(200).send({
          albums: album
        })
      } else {
        res.status(404).send({
          mensaje: 'NO hay datos'
        })
      }
    }
  })
}

function deleteAlbum(req, res) {
  var id = req.params.id;
  Album.findByIdAndRemove(id, (err, album) => {
    if (err)
      throw error;
    else {
      if (album) {
        res.status(200).send({
          albums: album.title + ' borrado correctamente'
        })
      } else {
        res.status(404).send({
          mensaje: 'NO hay datos'
        })
      }
    }
  })
}



module.exports = {
  getAlbum,
  getAlbums,
  saveAlbum,
  updateAlbum,
  deleteAlbum
}