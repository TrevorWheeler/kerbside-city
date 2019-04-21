const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const rp = require('request-promise')
const $ = require('cheerio')
const url =
  'https://www.brisbane.qld.gov.au/clean-green/rubbish-tips-bins/rubbish-collections/kerbside-collection'

app.use(bodyParser.json({ limit: '3mb' }))

app.get('/list', function(req, res, next) {
  try {
    rp(url).then(function(html) {
      const data = []
      $('#ddListItem > option', html).each(function(i, elem) {
        data[i] = $(this)
      })
      const startDate = []
      for (let i = 1; i < data.length; i++) {
        startDate.push({
          start: data[i][0].attribs.value
        })
      }
      const suburbs = []
      $('#ddListItem > option', html).each(function(i, elem) {
        suburbs[i] = $(this).text()
      })
      const suburbsArr = []
      for (let i = 1; i < data.length; i++) {
        suburbsArr.push({
          suburb: suburbs[i]
        })
      }
      const answer = []
      startDate.forEach((itm, i) => {
        answer.push(Object.assign({}, itm, suburbsArr[i]))
      })
      return res.status(200).json(answer)
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = {
  path: '/api',
  handler: app
}
