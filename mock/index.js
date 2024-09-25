import Mock from 'mockjs'
import users from './users'

const mocks = [
  ...users
]

for (const i of mocks) {
  Mock.mock(i.url, i.type, i.response)
}
