// app/mdx-page-remote/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function RemoteMdxPage() {
  // MDX 텍스트 - 데이터베이스, CMS, fetch 등 어디서든 가져올 수 있습니다
  const res = await fetch('https://...');
  const markdown = await res.text();

  return <MDXRemote source={markdown} />;
}
