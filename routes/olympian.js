var express = require('express');
var router = express.Router();
const Olympian = require('./../models').Olympian
const pry = require('pryjs')
const sequelize = require('sequelize');


router.get('/olympians', async function(req, res, next) {
  try {
    const allOlymps = await Olympian.findAll({
      attributes: ['sport', 'team', 'age', 'name', [sequelize.fn('COUNT', sequelize.col('medal')), 'total_medals_won']],
      group: ['Olympian.sport', 'Olympian.team', 'Olympian.age', 'Olympian.name']
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(allOlymps))
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify(error))
  }
});

module.exports = router;
