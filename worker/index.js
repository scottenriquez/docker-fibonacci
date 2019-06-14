const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

const fibonacci = (index) => {
  if(index < 2) {
    return 1;
  }
  return fibonacci(index - 1) + fibonacci(index - 2);
};

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fibonacci(parseInt(message)));
});
sub.subscribe('insert');