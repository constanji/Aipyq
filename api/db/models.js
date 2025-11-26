const mongoose = require('mongoose');
const { createModels } = require('@aipyq/data-schemas');
const models = createModels(mongoose);

module.exports = { ...models };
