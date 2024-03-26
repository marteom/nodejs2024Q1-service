import { DataSource } from 'typeorm';
import config from './typeOrm.config';

const dataSource: DataSource = new DataSource(config);

export { dataSource };
