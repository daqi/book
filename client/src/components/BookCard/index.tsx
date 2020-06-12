import React from 'react';
import { Card } from 'antd';
import styles from './index.less';
import { Book } from '@/types/book';

interface Iprops {
  item: Book;
  onClick?: any;
}

const BookCard: React.FC<Iprops> = ({ item, onClick }) => {
  const { pic } = item;
  return (
    <Card
      className={styles.component}
      hoverable
      cover={<img alt="" src={`http://localhost:3000/img?url=${encodeURIComponent(pic)}`} />}
      onClick={onClick}
    >
      {/* <Card.Meta
        title={`${title}(${rating})`}
        description={
          <>
            <p>{subjectCast}</p>
            <p>{description}</p>
          </>
        }
      /> */}
    </Card>
  );
};

export default BookCard;
