import { ReactNode } from 'react';
import Searchbar from '../components/searchbar';

// 메인 페이지 레이아웃 //
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
