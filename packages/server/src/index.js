const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

const swaggerOptions = {
    info: {
        title: 'Candidate management API',
        version: Pack.version,
    }
};

const server = Hapi.server({
    port: 80 || process.env.PORT,
});

server.route(require('./api/isAlive'));
server.route(require('./api/Schedule/Upcoming/upcoming'));
server.route(require('./api/Schedule/All/all'));


async function start() {
    try {
        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions,
            },
        ]);

        await server.start();
        console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line no-console
    } catch (err) {
        console.error(err); // eslint-disable-line no-console
        process.exit(1);
    }
}
start();
