import 'babel-polyfill'
var chai = require('chai')
var expect = chai.expect
import RedisClone from '../src/redis-clone'


describe('RedisClone', () => {
	const redis = new RedisClone()

	it('Should allow values to be set', () => {
		var result = redis.set('thing', 'thing data')
		expect(result).to.equal('OK')
		expect(redis.store.thing).to.equal('"thing data"')
	})

	it('should allow values to be retrieved', () => {
		var value = redis.get('thing')
		expect(value).to.equal('"thing data"')
	})

	it('should allow getset to retrieve the previous value and update it', () => {
		var value = redis.getset('thing', 'updated')
		expect(value).to.equal('"thing data"')
		expect(redis.store.thing).to.equal('"updated"')
	})
})
