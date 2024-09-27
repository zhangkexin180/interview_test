import { message } from "antd";
import { getUsers } from "../api/users";


interface UserValue {
  label: string;
  value: string;
}

/**
 * 获取用户列表的方法
 * @param keyword string 关键字
 * @returns UserValue[]
 */
export const getUserList = async (keyword: string): Promise<UserValue[]> => {
  const res = await getUsers(keyword);
  const {
    data: { Response },
  } = res;
  if (Response.Data) {
    return Response.Data.map(item => ({
      label: `${item.UserName}, 年龄:${item.UserAge}`,
      value: item.UserName,
    }));
  }
  if (Response.Error) {
    message.error(`${Response.Error.Code}, ${Response.Error.Message}`);
  }
  return [];
};