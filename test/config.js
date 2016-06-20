exports.config ={
  specs:['acceptance/*.js'],
  framework: 'mocha',
  mochaOpts:{
    reporter: 'spec',
    slow: 3000,
    enableTimeouts: true
  },
  capabilities:{
    'browserName': 'chrome'
  },
  directConnect: true
};
