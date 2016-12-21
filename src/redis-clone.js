import _ from 'lodash'

export default class RedisClone {
	constructor(){
		this.store  = {}
		this.hashes = {}
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

	hset(hashName, hashKey, value){
		var result;
		var hash = this.hashes[hashName]
		
		if(_.isUndefined(hash)){
			this.hashes[hashName] = {}
		}

		this.hashes[hashName][hashKey] = JSON.stringify(value)
	}

	hgetall(){

	}

	zadd(){

	}

	zrange(){

	}

	zcard(){

	}

	zrank(){

	}

}
