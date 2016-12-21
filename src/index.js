import vantage from 'vantage'
import RedisClone from './redis-clone'


const redis = new RedisClone()
const app   = vantage()

const DEFAULT_PORT = 6379

app.command('get [key]')
	.description('Get value by key')
	.action(function(args, cb){
		var result = redis.get(args.key)
		this.log(result)
		cb()
	})

app.command('set [key] [value]')
	.description('Set value by key')
	.action(function(args, cb){
		var result = redis.set(args.key, args.value)
		this.log(result)
		cb()
	})

app.command('getset [key] [value]')
	.description('Set value by key, return previous value.')
	.action(function(args, cb){
		var result = redis.getset(args.key, args.value)
		this.log(result)
		cb()
	})

app.command('hget [hash] [key]')
	.description('Get value stored in hash by key.')
	.action(function(args, cb){
		var result = redis.hget(args.hash, args.key)
		this.log(result)
		cb()
	})

app.command('hset [hash] [key] [value]')
	.description('Set value at key within hash.')
	.action(function(args, cb){
		var result = redis.hset(args.hash, args.key, args.value)
		this.log(result)
		cb()
	})

app.command('hgetall [hash]')
	.description('Get all values stored in hash by it\'s key name.')
	.action(function(args, cb){
		var result = redis.hgetall(args.hash)
		this.log(result)
	})


app.delimiter('redis-clone: ')
	.listen(DEFAULT_PORT)
	.banner(`######################################
# Welcome to this Redis Clone.       #
# Run Help to get a list of commands #
#####################################`)
	.show()
