import { User } from '../src/api/users';

const data: User[] = [
  { UserName: 'xiaoli', UserAge: 20 },
  { UserName: 'laoniu', UserAge: 50 },
  { UserName: 'ivykxzhang', UserAge: 30 },
  { UserName: 'zhangsan', UserAge: 25 },
  { UserName: 'lisi', UserAge: 46 },
];

export default [
  {
    url: RegExp('https://mock.com/getUser' + '.*'),
    type: 'post',
    response: req => {
      const { keyword } = JSON.parse(req.body);
      return {
        code: 200,
        msg: 'success',
        data: {
          Response: {
            Data: keyword
              ? data.filter(
                  item =>
                    item.UserName.indexOf(keyword) > -1 ||
                    String(item.UserAge) === keyword
                )
              : data.slice(0, 10),
          },
        },
      };
      // return {
      //   code: 200,
      //   msg: 'error',
      //   data: {
      //     Response: {
      //       Error: {
      //         Code: 10001,
      //         Message: '查询用户列表失败',
      //       },
      //     },
      //   },
      // };
    },
  },
];
