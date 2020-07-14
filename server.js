const app = require('./src/app');
const config = require('./src/config/port_config');
const logger = require('./src/logger');

const { port } = config;

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
