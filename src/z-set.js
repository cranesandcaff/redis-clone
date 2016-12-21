import _ from 'lodash'

export default class ZSet {
	constructor(){
		this.store = []
	}

	add(data, score){
		this.store = _.reject(this.store, { value: data })

		var addition = {
			value: data,
			score
		}

		this.store.push(addition)
		return this
	}

	withinRange(start, end){
		var values = _.filter(this.store, (value) => {
			return value.score >= start || value.score <= end
		})

		return _.map(values, v => v.value)
	}

	size(){
		return this.store.length
	}

	rank(data){
		var stored = _.find(this.store, { value: data })
		return data.score
	}
}
