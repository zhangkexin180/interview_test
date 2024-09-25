import Mock from 'mockjs';
import GetUsers from './GetUsers';

const mocks = [...GetUsers];

for (const i of mocks) {
  Mock.mock(i.url, i.type, i.response);
}
