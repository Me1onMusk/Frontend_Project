import './globals.css';
import Link from 'next/link';
import { BookData } from '../../types';
import style from './layout.module.css';
// 푸터 함수 //
async function Footer() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: 'force-cache',
  }); //dynamic
  if (!response.ok) {
    return <footer>제작 @김태영</footer>;
  }

  const books: BookData[] = await response.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @김태영</div>
    </footer>
  );
}

// 메인 레이아웃 //
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={'/'}>📚 도서 상점</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
