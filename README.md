# Koroibos

Koroibos is a take home project from [Turing School of Software & Design](https://github.com/turingschool) using data from the 2016 Summer Olympics. The data set is an import from a csv file of all participating olympians that can be found [here](https://github.com/dionew1/backend-curriculum-site/blob/gh-pages/module4/projects/take_home_challenge/prompts/olympic_data_2016.csv).

## Setup and Installation

Fork and clone the repository

run the following commands in your terminal:
```
$ npm install
$ npx sequelize db:create
$ npx sequelize db:migrate
$ node csv_parser.js
```

### Versions
* Node - v11.14.0
* npm - 6.9.0
* psql (PostgreSQL) 11.3

## API Endpoints

### GET api/v1/olympians
```
{
  "olympians":
    [
      {
        "name": "Maha Abdalsalam",
        "team": "Egypt",
        "age": 18,
        "sport": "Diving"
        "total_medals_won": 0
      },
      {
        "name": "Ahmad Abughaush",
        "team": "Jordan",
        "age": 20,
        "sport": "Taekwondo"
        "total_medals_won": 1
      },
      {...}
    ]
}
```

### GET api/v1/olympians?age=youngest
```
{
  [
    {
      "name": "Ana Iulia Dascl",
      "team": "Romania",
      "age": 13,
      "sport": "Swimming"
      "total_medals_won": 0
    }
  ]
}
```

### GET api/v1/olympians?age=oldest
```
{
  [
    {
      "name": "Julie Brougham",
      "team": "New Zealand",
      "age": 62,
      "sport": "Equestrianism"
      "total_medals_won": 0
    }
  ]
}
```

### GET api/v1/olympian_stats
```
{
  "olympian_stats": {
    "total_competing_olympians": 3120
    "average_weight:" {
      "unit": "kg",
      "male_olympians": 75.4,
      "female_olympians": 70.2
    }
    "average_age:" 26.2
  }
}
```

### GET api/v1/events
```
{
  "events":
    [
      {
        "sport": "Archery",
        "events": [
          "Archery Men's Individual",
          "Archery Men's Team",
          "Archery Women's Individual",
          "Archery Women's Team"
        ]
      },
      {
        "sport": "Badminton",
        "events": [
          "Badminton Men's Doubles",
          "Badminton Men's Singles",
          "Badminton Women's Doubles",
          "Badminton Women's Singles",
          "Badminton Mixed Doubles"
        ]
      },
      {...}
    ]
}
```

### GET api/v1/events/:id/medalists
```
{
  "event": "Badminton Mixed Doubles",
  "medalists": [
      {
        "name": "Tontowi Ahmad",
        "team": "Indonesia-1",
        "age": 29,
        "medal": "Gold"
      },
      {
        "name": "Chan Peng Soon",
        "team": "Malaysia",
        "age": 28,
        "medal": "Silver"
      }
    ]
}
```
