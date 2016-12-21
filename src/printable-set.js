import _ from 'lodash'

export default function printableSet(set){
	var i = 0
	var result = _.map(set, (value, key) => {
		var innerResult = []
		i = i + 1
		innerResult.push(`${i}) ${value.value}`)
		i = i + 1
		innerResult.push(`${i}) ${value.score}`)
		return innerResult.join('\n')
	})

	result = result.join('\n')

	return result
}
