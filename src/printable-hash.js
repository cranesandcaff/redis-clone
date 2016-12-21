import _ from 'lodash'

export default function printableHash(hash){
	var i = 0

	var result = _.map(hash, (value, key) => {
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
