var shell = require('shelljs');
var request = require("supertest");
var bodyParser = require('body-parser');
var express = require('express');
var test = express();
var app = require('./app.js');
const Olympian = require('./models').Olympian;
const Event = require('./models').Event;

test.use(bodyParser.json());
test.use(bodyParser.urlencoded({ extended: true }));

describe('api spec', () => {

  beforeAll( async () => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    const olympians = await Olympian.findAll()
    for (let i = 0; olympians.length >= i; i++) {
      let end = await Olympian.destroy({
        where: { height: 170 }
      });
    }
    const events = await Event.findAll()
    for (let i = 0; events.length > i; i++) {
      let end = await Event.destroy({
        where: { sport: "Swimming" }
      });
    }
    const new1 = await Olympian.create({
      name: "Maha Abdalsalam",
      team: "Egypt",
      sex: 'F',
      age: 18,
      height: 170,
      weight: 125,
      games: "2016 Summer",
      sport: "Diving",
      event: "Gymnastics Men's Individual All-Around",
      medal: null
    });
    const new2 = await Olympian.create({
      name: "Marcelo Alberto Acosta Jimnez",
      sex: "M",
      age: 20,
      height: 170,
      weight: null,
      team: "El Salvador",
      games: "2016 Summer",
      sport: "Swimming",
      event: "Swimming Men's 400 metres Freestyle",
      medal: "Gold"
    });
    const new3 = await Event.create({
      sport: "Swimming",
      name: "Swimming Men's 400 metres Freestyle"
    });
  });

  describe('Olympian Endpoints', () => {
    it('GET request for all olympians', async () => {
      const response = await request(app).get("/api/v1/olympians")
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        "olympians": [
          {
            "name": "Marcelo Alberto Acosta Jimnez",
            "age": 20,
            "team": "El Salvador",
            "sport": "Swimming",
            "total_medals_won": "1"
          },
          {
            "name": "Maha Abdalsalam",
            "age": 18,
            "team": "Egypt",
            "sport": "Diving",
            "total_medals_won": "0"
          }
        ]
      }));
    });

    it('GET request for youngest olympian', async () => {
      const response = await request(app).get("/api/v1/olympians?age=youngest")
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        "olympians": [
          {
            "name": "Maha Abdalsalam",
            "age": 18,
            "team": "Egypt",
            "sport": "Diving",
            "total_medals_won": "0"
          }
        ]
      }));
    });

    it('GET request for oldest olympian', async () => {
      const response = await request(app).get("/api/v1/olympians?age=oldest")
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        "olympians": [
          {
            "name": "Marcelo Alberto Acosta Jimnez",
            "age": 20,
            "team": "El Salvador",
            "sport": "Swimming",
            "total_medals_won": "1"
          }
        ]
      }));
    });
  });


  describe('Stat Endpoints', () => {
    it('GET request for olympian stats', async () => {
      const response = await request(app).get("/api/v1/olympian_stats")
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        "olympian_stats": {
          "total_competing_olympians": 2,
          "average_weight": {
            "unit": "kg",
            "male_olympians": null,
            "female_olympians": 125
          },
          "average_age": 19
        }
      }));
    });
  });

  describe('Event Endpoints', () => {
    it('GET request for all events', async () => {
      const response = await request(app).get("/api/v1/events")
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        "events":[
          {
            "sport": "Swimming",
            "events": [
              "Swimming Men's 400 metres Freestyle"
            ]
          }
        ]
      }));
    });

    it('GET request for event medalists', async () => {
      const events = await Event.findAll();
      const eventID = events[0].id;
      console.log(eventID)
      const response = await request(app).get(`/api/v1/events/${eventID}/medalists`)
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        "event": "Swimming Men's 400 metres Freestyle",
        "medalists": [
          {
            "name": "Marcelo Alberto Acosta Jimnez",
            "age": 20,
            "team": "El Salvador",
            "medal": "Gold"
          }
        ]
      }));
    });

  });

});
