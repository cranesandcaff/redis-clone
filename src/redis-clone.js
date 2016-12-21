import _ from 'lodash'
import ZSet from './z-set'
import printableArray from './printable-array'
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
		data = JSON.stringify(data)
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

		if(_.isUndefined(result)){
			return 'nil'
		}

		return result

	}

	hset(hashName, hashKey, data){
		data = JSON.stringify(data)

		var result;
		var hash = this.hashes[hashName]

		if(_.isUndefined(hash)){
			this.hashes[hashName] = {}
		}

		hash = this.hashes[hashName]

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

		result = printableArray(hash)

		return result
	}

	// This should force the score to be an integer and throw a fit if it fails that test.
	zadd(setName, score, data){
		data = JSON.stringify(data)

		var set = this.sets[setName]

		if(_.isUndefined(set)){
			this.sets[setName] = new ZSet()
		}

		this.sets[setName].add(data, score)
		// This would return the number of items added, however we only allow a single item to be added so always returns one.
		return 1
	}

	zrange(setName, start, end){
		var set = this.sets[setName]

		if(_.isUndefined(set)){
			// @TODO: Verify that this matches the spec.
			return 'nil'
		}

		var result = set.withinRange(start, end)

		return printableArray(result)
	}

	zcard(setName){

		if(_.isUndefined(setName)){
			return 'nil'
		}

		var set = this.sets[setName]

		if(_.isUndefined(set)){
			this.sets[setName] = new ZSet()
		}

		return set.size()
	}

	zrank(setName, data){
		data = JSON.stringify(data)
		var set = this.sets[setName]

		if(_.isUndefined(set)){
			// @TODO: Verify that this matches the spec.
			return 'nil'
		}

		return set.rank(data)
	}

}
