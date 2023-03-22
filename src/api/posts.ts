import http from '@/http';

interface PostsData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export const getPostsById = (id: string) => {
  return http<undefined, PostsData>({
    url: `/posts/${id}`,
    method: 'GET',
    interceptors: {
      requestInterceptors(config) {
        console.log('接口请求');
        return config;
      },
      responseInterceptors(result) {
        console.log('接口响应');
        return result;
      },
    },
  });
};
export default {
  getPostsById,
};
