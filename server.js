if (process.env.NODE_ENV !== 'production') {
     require('dotenv').config()
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const express = require('express');
const app = express();
const axios = require('axios')

app.use(express.json());

if (process.env.NODE_ENV === 'production') {

     app.use(express.static('client/build'))

     app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
     })
}

app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});

app.post('/search', async (req, res) => {
     const url = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${req.body.latitude},${req.body.longitude}`


     try {
          const weatherResponse = await axios.get(url)
          res.json({
               'currentData': weatherResponse.data.currently,
               'dailyData': weatherResponse.data.daily.data
          })
     } catch (error) {
          console.log(error)
     }
})



const port = process.env.PORT || 8080;
app.listen(port, () => {
     console.log(`Server started on port ${port}`)
})