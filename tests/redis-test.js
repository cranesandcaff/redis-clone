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

	it('should return "nil" when acessing an undefined value within a hash', () => {
		var result = redis.hget('hash', 'hashKey')
		expect(result).to.equal('nil')
	})

	it('should allow hset to set a value at a key within a hash', () => {
		var result = redis.hset('hash', 'hashKey', 'hashValue')
		expect(result).to.equal(1)
	})

	it('should allow the hget command to get the value at the key in a hash', () => {
		var result = redis.hget('hash', 'hashKey')
		expect(result).to.equal('"hashValue"')
	})

	it('should retrieve entire hash as string from value', () => {
		var result = redis.hgetall('hash')
		expect(result).to.equal(`1) hashKey
2) "hashValue"`)
	})

	it('should have allow items to be added with the zadd command', () => {
		var result = redis.zadd('testSet', 1, 'data')
		expect(result).to.equal(1)
	})

	it('should overwrite the same object in a set', () => {
		var result = redis.zadd('testSet', 3, 'data')
		expect(result).to.equal(1)
	})

	it('should return the size of the set', () => {
		var result = redis.zadd('testSet', 2, 'datad')
		var size = redis.zcard('testSet')
		expect(result).to.equal(1)
		expect(size).to.equal(2)
	})


})
