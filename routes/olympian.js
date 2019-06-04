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

router.get('/olympian_stats', async function(req, res, next){
  try {
    // SELECT COUNT("Olympians"."name") FROM "Olympians" GROUP BY "Olympians"."team", "Olympians"."name";
    const olymps = await Olympian.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('name')), 'tots_olymps']
      ],
      group: ['Olympian.age', 'Olympian.name']
    });

    const avgAge = await Olympian.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('age')), 'avg_age']
      ]
    });
    const age = avgAge[0].dataValues.avg_age

    const avgMale = await Olympian.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('weight')), 'm_olymps']
      ],
      where: { sex: 'M' }
    });
    const maleWt = avgMale[0].dataValues.m_olymps;

    const avgFemale = await Olympian.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('weight')), 'f_olymps']
      ],
      where: { sex: 'F' }
    });
    const femaleWt = avgFemale[0].dataValues.f_olymps;

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
      olympian_stats: {
        total_competing_olympians: olymps.length,
        average_weight: {
          unit: 'kg',
          male_olympians: Number(Math.round(maleWt+'e2')+'e-2'),
          female_olympians: Number(Math.round(femaleWt+'e2')+'e-2')
        },
        average_age: Number(Math.round(age+'e2')+'e-2')
      }
    }));
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify(error));
  }
});

router.get('events', async function(req, res, next){
  try {

  } catch {

  }  
});

module.exports = router;
