import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const nextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        hostname: 'www.notion.so',
      },
    ],
  },
};

const withMDX = createMDX({
  // 필요한 마크다운 플러그인을 추가할 수 있음~!
  options: {
    remarkPlugins: [],
    // @ts-expect-error remark-gfm 타입 충돌 문제 해결
    rehypePlugins: [['rehype-katex', { strict: true, throwOnError: true }]],
    // remarkPlugins: [remarkGfm],
    // ts-expect-error remark-gfm 타입 충돌 문제 해결
    // remarkPlugins: [['remark-gfm']],
  },
});

export default withMDX(nextConfig);
