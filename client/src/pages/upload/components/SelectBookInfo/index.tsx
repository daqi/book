import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import { useRequest } from 'umi';
import { search } from '@/services';
import BookCard from '@/components/BookCard';
import { Book } from '@/types/book';

import styles from './index.less';

async function getBookInfos(keywords = '') {
  const trimed = keywords.trim();
  if (trimed === '') return;
  const result = await search(trimed);
  return result;
}

interface Iprops {
  onSelect: any;
}

const SelectBookInfo: React.FC<Iprops> = ({ onSelect }) => {
  const [bookInfos, setBookInfos] = useState<Array<Book>>([]);
  const { loading, run } = useRequest(getBookInfos, {
    onSuccess: result => {
      console.log(result);
      if (result && result.code === 0) {
        setBookInfos(result.data.data);
      }
    },
  });
  console.log(bookInfos);
  return (
    <div className={styles.selectbookinfo}>
      <Input.Search
        placeholder="输入书籍名称"
        enterButton="搜索"
        size="large"
        onSearch={run}
      />
      <div>
        {bookInfos.map(item => (
          <BookCard
            item={item}
            key={item.id}
            onClick={() => {
              onSelect(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectBookInfo;
