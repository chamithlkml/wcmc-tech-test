import assert from 'assert'
import request from 'supertest'
import app from '../index'

describe('GET /api/countries', () => {
  it('Should return an array', (done) => {
    request(app)
      .get('/api/countries')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)

        assert.equal(Array.isArray(res.body), true)
        done()
      })
  })
})

describe('GET /api/countries?prefix', () => {
  it('Should return an array', (done) => {
    request(app)
      .get('/api/countries?prefix=Au')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)

        assert.equal(res.body.includes('Austria'), true)
        done()
      })
  })
})