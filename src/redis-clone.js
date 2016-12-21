import _ from 'lodash'
import ZSet from './z-set'

// Consider using immutable.js or ES6 maps/sets to offset some work?
// Move printing array to it's own function. It's in use more than one spot.

export default class RedisClone {
	constructor(){
		this.store  = {}
		this.hashes = {}
		this.sets   = {}
	}

	get(key){
		var result = this.store[key]
		if(_.isUndefined(result)){
			return null
		}

		return result
	}

	set(key, data){
		data = JSON.stringify(data)
		this.store[key] = data
		return 'OK'
	}

	getset(key, data){
		var previous = this.store[key]

		if(_.isUndefined(previous)){
			previous = 'nil'
		}

		this.store[key] = data
		return previous
	}

	hget(hashName, hashKey){
		var hash = this.hashes[hashName]

		if(_.isUndefined(hash)){
			return 'nil'
		}

		var result = this.hashes[hashName][hashKey]

		return result

	}

	hset(hashName, hashKey, data){
		data = JSON.stringify(data)

		var result;
		var hash = this.hashes[hashName]

		if(_.isUndefined(hash)){
			this.hashes[hashName] = {}
		}

		if(_.isUndefined(hash[hashKey])){
			result = 1
		} else {
			result = 0
		}

		this.hashes[hashName][hashKey] = data
		return result
	}

	hgetall(hashName){
		var result;
		var hash   = this.hashes[hashName]

		if(_.isUndefined(hash)){
			return 'nil'
		}

		var i = 0

		result = _.map(hash, (value, key) => {
			var innerResult = []
			i = i + 1
			innerResult.push(`${i}) ${key}`)
			i = i + 1
			innerResult.push(`${i}) ${value}`)
			return innerResult.join('\n')
		})

		result = result.join('\n')

		return result
	}

	zadd(setName, score, data){
		data = JSON.stringify(data)

		var set = this.sets[setName]
		if(_.isUndefined(set)){
			this.sets[setName] = new ZSet()
		}

		this.sets[setName].add(data, score)
	}

	zrange(){
		return 'NOT IMPLEMENTED'
	}

	zcard(){
		var set = this.sets[setName]
		
		if(_.isUndefined(set)){
			this.sets[setName] = new ZSet()
		}

		return set.size()
	}

	zrank(){
		return 'NOT IMPLEMENTED'
	}

}
