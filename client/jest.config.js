module.exports = {
  displayName: 'client',
  setupFiles: ['<rootDir>/test/setup-tests.js'],
  modulePaths: ['<rootDir>/app', '<rootDir>/test'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
