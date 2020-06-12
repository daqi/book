import request from '@/utils/request';
export const search = (keywords: string) => {
  return request({
    url: 'search',
    data: { q: keywords },
  });
};
