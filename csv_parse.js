const fetch = require('node-fetch');
const Olympian = require('./models').Olympian
const Event = require('./models').Event
const pry = require('pryjs');

const csvData = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/dionew1/backend-curriculum-site/gh-pages/module4/projects/take_home_challenge/prompts/olympic_data_2016.csv');
    const data = await response.text();
    return data;
  } catch (error) {
    return error;
  }
}

const olympObj = async () => {
  try {
    const data = await csvData();
    let allOlymps = data.split('\r\n');
    allOlymps.shift()
    allOlymps = allOlymps.map(row => {
      let attrs = row
      if (attrs.includes(', ')) {
        attrs = attrs.replace(', ', '. ')
        if (attrs.includes(', ')) {attrs = attrs.replace(', ', '. ')}
      }
      if (attrs.includes(',0')) { attrs = attrs.replace(',0', '.0') }
      if (attrs.includes(',5')) { attrs = attrs.replace('1,500', '1.500') }

      let olymp = attrs.split(',');
      for (let i = 0; i < olymp.length; i++) {
        let lmnt = olymp[i];
        lmnt === 'NA' ? olymp[i] = null : olymp[i]
      }
      obj = {
        name: olymp[0],
        sex: olymp[1],
        age: olymp[2] === null ? olymp[2] : parseInt(olymp[2]),
        height: olymp[3] === null ? olymp[3] : parseInt(olymp[3]),
        weight: olymp[4] === null ? olymp[4] : parseInt(olymp[4]),
        team: olymp[5],
        games: olymp[6],
        sport: olymp[7],
        event: olymp[8].replace('.', ','),
        medal: olymp[9]
      }
      return obj
    });
    return allOlymps;
  } catch (error) {
    return error
  }
}

const populate = async () => {
  try {
    olympians = await olympObj();
    olympians.map(obj => {
      Olympian.findOrCreate({
        where: {
          name: obj.name,
          sex: obj.sex,
          age: obj.age,
          height: obj.height,
          weight: obj.weight,
          team: obj.team,
          games: obj.games,
          sport: obj.sport,
          event: obj.event,
          medal: obj.medal
        }
      });

      Event.findOrCreate({
        where: {
          sport: obj.sport,
          name: obj.event
        }
      });
    });
    return 'Success'
  } catch (error) {
    return error;
  }
}
console.log(populate());
