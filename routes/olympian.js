var express = require('express');
var router = express.Router();
const Olympian = require('./../models').Olympian
const pry = require('pryjs')
const sequelize = require('sequelize');


router.get('/olympians', async function(req, res, next) {
  try {
    let olymps = null;
    if (req.query.age) {
      if (req.query.age === 'youngest') {
        let age = await Olympian.min('age')
        olymps = await Olympian.findAll({
          where: { age: age },
          attributes: ['name', 'age', 'team', 'sport', [sequelize.fn('COUNT', sequelize.col('medal')), 'total_medals_won']],
          group: ['Olympian.sport', 'Olympian.team', 'Olympian.age', 'Olympian.name']
        });
      } else if (req.query.age === 'oldest') {
        let age = await Olympian.max('age')
        olymps = await Olympian.findAll({
          where: { age: age },
          attributes: ['name', 'age', 'team', 'sport', [sequelize.fn('COUNT', sequelize.col('medal')), 'total_medals_won']],
          group: ['Olympian.sport', 'Olympian.team', 'Olympian.age', 'Olympian.name']
        });
      }
    } else {
      olymps = await Olympian.findAll({
        attributes: ['name', 'age', 'team', 'sport', [sequelize.fn('COUNT', sequelize.col('medal')), 'total_medals_won']],
        group: ['Olympian.sport', 'Olympian.team', 'Olympian.age', 'Olympian.name']
      });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({olympians: olymps}));
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify(error));
  }
});

module.exports = router;
