import request from '../utils/request';

export interface User {
  UserName: string;
  UserAge: number;
}
export interface IGetUsersResponse {
  code: number;
  msg: string;
  data: {
    Response: {
      Data?: User[];
      Error?: {
        Code: number;
        Message: string;
      };
    };
  };
}

/**
 * 获取用户列表接口
 * @param keyword string 关键字
 * @returns IGetUsersResponse[]
 */
export const getUsers = async (keyword: string): Promise<IGetUsersResponse> => {
  return await request({
    url: '/getUser',
    method: 'post',
    data: {
      keyword,
    },
  });
};
