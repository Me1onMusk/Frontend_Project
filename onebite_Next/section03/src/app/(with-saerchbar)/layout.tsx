
import { ReactNode, Suspense } from "react";
import Searchbar from "../components/searchbar";

// 메인 함수 //
export default function Layout({children}: {children: ReactNode;}) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
