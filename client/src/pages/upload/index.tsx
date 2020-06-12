import React, { useState } from 'react';
import { Upload, message, Button, Input } from 'antd';
import { UploadOutlined, SelectOutlined } from '@ant-design/icons';
import { UploadProps, UploadFile } from 'antd/lib/upload/interface';
import { Book } from '@/types/book';

import styles from './index.less';
import BookInfo from './components/BookInfo';
import SelectBookInfo from './components/SelectBookInfo';

export default () => {
  const [bookInfo, setBookInfo] = useState<Book | undefined>();
  const [selecting, setSelecting] = useState<boolean>(false);
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);
  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const fileList = info.fileList.slice(-1);
      setFileList(fileList);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功！`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败。`);
      }
    },
  };
  return (
    <div>
      <h1 className={styles.title}>上传书籍</h1>
      <div className={styles.form}>
        <div>
          <Button size="large" onClick={() => setSelecting(true)}>
            <SelectOutlined /> 选择书籍信息
          </Button>
          {selecting ? (
            <SelectBookInfo
              onSelect={(value: Book) => {
                setSelecting(false);
                setBookInfo(value);
              }}
            />
          ) : (
            <BookInfo data={bookInfo} />
          )}
        </div>
        <div>
          <Upload {...uploadProps} fileList={fileList}>
            <Button size="large">
              <UploadOutlined /> 上传书籍PDF
            </Button>
          </Upload>
        </div>
        <div>
          <Button type="primary">提交</Button>
        </div>
      </div>
    </div>
  );
};
