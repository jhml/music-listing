// Manual Jest mock for axios to avoid loading ESM entry from node_modules.
const mock = {
  get: jest.fn().mockResolvedValue({ data: [] }),
  post: jest.fn().mockResolvedValue({ data: {} }),
  put: jest.fn().mockResolvedValue({ data: {} }),
  delete: jest.fn().mockResolvedValue({ data: {} }),
  create: jest.fn(() => mock),
};

module.exports = mock;
module.exports.default = mock;
