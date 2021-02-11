const app = require('express')()
const bodyParser = require('body-parser')
const ytsr = require('ytsr')
const SpotifyWebApi = require('spotify-web-api-node')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

const scopes = ['user-read-private', 'user-read-email']
const redirectUri = 'http://localhost:3000/api/login/spotify/callback'

let spotifyApi = new SpotifyWebApi({
  clientId: 'a7a75b8abbcb4267aef9e6aa2b5f5505',
  clientSecret: '45d56f6517684df1b13fbb2be11c4b96',
  redirectUri
})

app.get('/search', async (req, res) => {
  let { q } = req.query
  const result = await ytsr(q, { pages: 1 })
  let spotifyToken = spotifyApi.getAccessToken()
  console.log('spotify token', spotifyApi.getAccessToken())
  if (spotifyToken) {
    const searchResultSpotify = await spotifyApi.searchTracks(q)
    console.log(searchResultSpotify.body.tracks)
    res.send({
      result,
      result_spotify: searchResultSpotify.body.tracks.items
    })
  } else {
    res.send({ result })
  }
})

app.get('/login/spotify', async (req, res) => {
  let html = spotifyApi.createAuthorizeURL(scopes)
  console.log(html)
  res.send(html + '&show_dialog=true')
})

app.get('/login/spotify/callback', async (req, res) => {
  const { code } = req.query
  console.log('callback', code)
  try {
    var data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body
    spotifyApi.setAccessToken(access_token)
    spotifyApi.setRefreshToken(refresh_token)

    res.redirect('http://localhost:3000/')
  } catch (err) {
    res.redirect('/#/error/invalid token')
  }
})

app.get('/spotify/me', async (req, res) => {
  try {
    let data = await spotifyApi.getMe()
    res.send({ data })
  } catch (error) {
    res.send({ error })
  }
})

module.exports = app
