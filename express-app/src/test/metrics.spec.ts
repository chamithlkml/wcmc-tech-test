import assert from 'assert'
import request from 'supertest'
import app from '../index'

describe('GET /api/metrics?country', () => {
  it('Should return metrics', (done) => {
    request(app)
      .get('/api/metrics?country=Austria')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)

        assert.equal(typeof res.body, 'object')
        done();
      })
  })
})