import UserSelect from './components/UserSelect';
import { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import './App.less';

function App() {
  const [value, setValue] = useState<string[]>(['xiaoli', 'zhangsan']);

  return (
    <>
      <UserSelect
        mode='multiple'
        placeholder='请选择用户'
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
        allowClear
        style={{ width: 600 }}
        leftSlot={<p>用户：</p>}
      >
        <InfoCircleOutlined style={{margin: 6}} />
      </UserSelect>
    </>
  );
}

export default App;
