const backend = {
  sum(a, b) {
    // this sum runs in the node process
    return a + b;
  },

  getEnv() {
    // access to OS info
    return process.env;
  }
};

module.exports = backend;
