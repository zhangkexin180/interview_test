import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import debounce from 'lodash/debounce';
import { getUserList } from '../api/common';
import './UserSelect.less';

interface SelectItemType {
  label: React.ReactNode | string;
  value: string | number;
  key?: string;
}

interface IUserSelectProps extends Omit<SelectProps, 'children'> {
  fetchOptions?: (search: string) => Promise<SelectItemType[]>; //获取用户列表的方法
  debounceTimeout?: number;
  maxUserCount?: number; //最多显示多少用户
  children?: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const UserSelect: React.FC<IUserSelectProps> = ({
  fetchOptions = getUserList,
  debounceTimeout = 800,
  maxUserCount,
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<SelectItemType[]>([]);
  const fetchRef = useRef(0);

  useEffect(() => {
    fetchOptions('').then(newOptions => {
      setOptions(newOptions.slice(0, maxUserCount || newOptions.length));
    });
  }, [fetchOptions, maxUserCount]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string): void => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setOptions(newOptions.slice(0, maxUserCount || newOptions.length));
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout, maxUserCount]);

  return (
    <div className='user-select'>
      <div className='flex-row'>
        <div className='left'>{props.leftSlot}</div>
        <Select
          labelInValue
          filterOption={false}
          onSearch={debounceFetcher}
          notFoundContent={fetching ? <Spin size='small' /> : null}
          {...props}
          options={options}
        />
        <div className='right'>{props.rightSlot}</div>
      </div>
      {props.children}
    </div>
  );
};

export default UserSelect;
