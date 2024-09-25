export default [
  {
    url: 'https://mock.com/getUser',
    type: 'get',
    response: () => {
      // return {
      //   code: 200,
      //   msg: 'success',
      //   data: {
      //     Response: {
      //       Data: [
      //         { UserName: 'xiaoli', UserAge: 20 },
      //         { UserName: 'laoniu', UserAge: 50 },
      //       ],
      //     },
      //   },
      // };
      return {
        code: 200,
        msg: 'error',
        data: {
          Response: {
            Error:{
              Code:1001,
              Message: '获取人名列表失败'
            }
          },
        },
      };
    },
  },
];
