import React from 'react';

import styles from './index.less';
import BookCard from '@/components/BookCard';
import { Book } from '@/types/book';

interface Iprops {
  data?: Book;
}

const BookInfo: React.FC<Iprops> = ({ data }) => {
  return (
    <div className={styles.bookinfo}>
      {data ? (
        <BookCard item={data}/>
      ) : (
        <div>未选择书籍信息</div>
      )}
    </div>
  );
};

export default BookInfo;
