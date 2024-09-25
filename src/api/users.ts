import request from '../utils/request';

export const getUsers = async (keyword: string) => {
  return await request({
    url: '/getUser',
    method: 'post',
    data: {
      keyword,
    },
  });
};
