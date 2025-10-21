import Sequelize from 'sequelize';
import * as databaseConfig from '../config/database.cjs';

import User from '../app/models/User.js';
import Task from '../app/models/Task.js';

const databaseConfig = databaseConfigCjs.default || databaseConfigCjs;

const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Passa a configuração corretamente resolvida
    this.connection = new Sequelize(databaseConfig); 

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();