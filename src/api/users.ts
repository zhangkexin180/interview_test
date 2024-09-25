import request from "../utils/request";

export const getUsers = async () => {
  return await request({
    url: '/getUser',
    method: 'get',
  })
}