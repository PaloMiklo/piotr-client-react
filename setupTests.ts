import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as config from './public/config.json';

console.log('✅ Setup file was executed!');

const mock = new MockAdapter(axios);
mock.onGet('/config.json').reply(200, { data: config });