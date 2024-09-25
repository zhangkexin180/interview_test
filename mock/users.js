import Mock from 'mockjs';

const data = [
  { UserName: 'xiaoli', UserAge: 20 },
  { UserName: 'laoniu', UserAge: 50 },
  { UserName: 'ivykxzhang', UserAge: 30 },
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
            Data: data.filter(
              item =>
                item.UserName.indexOf(keyword) > -1 ||
                String(item.UserAge) === keyword
            ),
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
