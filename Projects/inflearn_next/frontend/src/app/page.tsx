import { auth } from "../../auth";
import { signOut } from "../../auth";
import Link from "next/link";

// 메인 페이지 //
export default async function Home() {

  const session = await auth();

  return (
    <div>
      <h1>메인 페이지</h1>
      <h2>현재 로그인한 유저 : {session?.user?.email}</h2>
      {session?.user ? (
        <form
          action={async () => {
            "use server"
            await signOut();
          }}
        >
          <button type="submit">로그아웃</button>
        </form>
      ) : (
        <Link href="/signin">로그인</Link>
      )}

    </div>
  );
};