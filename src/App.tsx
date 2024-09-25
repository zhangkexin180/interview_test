import { useEffect, useState } from 'react';
import './App.less';
import { getUsers } from './api/users';
import { Select, message } from 'antd';

function App() {
  const [users, setUsers] = useState<{ label: string; value: string }[]>([]);
  const [user, setUser] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    console.log(users)
  }, [users])

  const getUserList = async (keyword: string) => {
    const res = await getUsers(keyword);
    const {
      data: { Response },
    } = res;
    console.log(Response)
    if (Response.Data) {
      console.log(Response.Data)
      setUsers(
        Response.Data.map(item => ({
          label: `姓名:${item.UserName}, 年龄:${item.UserAge}`,
          value: item.UserName,
        }))
      );
      return;
    }
    if (Response.Error) {
      message.error(`${Response.Error.Code}, ${Response.Error.Message}`);
    }
  };

  return (
    <>
      <Select
        options={users}
        value={user}
        onChange={setUser}
        showSearch
        searchValue={searchValue}
        onSearch={value => {
          setSearchValue(value);
          getUserList(value);
        }}
        filterOption={false}
        style={{width: 200}}
        allowClear
      ></Select>
    </>
  );
}

export default App;
