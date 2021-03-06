const express = require('express')
const app = express()
const db = require('./config/db');
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
const PORT = process.env.PORT || 8000


app.use('/', require('./routes/workouts'))


app.listen(PORT, () => {
  db.initDb((err, db ) => {
    if (err) {
      console.log(err)
    } 
})
})

