import _ from 'lodash'

export default class ZSet {
	constructor(){
		this.store = []
	}
	
	add(data, score){
		var exists = _.includes(this.store, data)

		if(exists){
			this.store = _.reject(this.store, { value: data })
		}

		var addition = {
			value: data,
			score
		}

		this.store.push(addition)
		return this
	}

	withinRange(start, end){
		return _.filter(this.store, (value) => {
			return value.score >= start || value.score <= end
		})
	}

	size(){
		return this.store.length
	}

	rank(data){

	}
}
