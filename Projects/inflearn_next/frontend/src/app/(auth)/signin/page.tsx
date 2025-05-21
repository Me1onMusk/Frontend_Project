
'use client';

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

// 로그인 페이지 //
export default function SigninPage() {
    const [email, setEmail] = useState("");     
    const [password, setPassword] = useState("");

    //폼 제출 시 처리 로직 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">로그인</h1>
            <p className="text-gray-700">인프런 계정으로 로그인할 수 있어요</p>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-2">
                <label htmlFor="email">이메일</label>
                <input 
                    className="border-2 border-gray-300 rounded-sm p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="example@inflab.com"
                />
                <label htmlFor="password">비밀번호</label>
                <input 
                    className="border-2 border-gray-300 rounded-sm p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="12345678"
                />
                <button 
                    className="bg-green-500 text-white rounded-md font-bold p-2 cursor-pointer"
                    type="submit">
                    로그인
                </button>
                <div className="flex gap-2 text-sm">
                    <Link className="text-center" href="/">비밀번호 찾기</Link>
                    <p>|</p>
                    <Link className="text-center" href="/signup">회원가입</Link>
                    <p>|</p>
                    <Link className="text-center" href="/">아이디(이메일) 찾기</Link>
                </div>
            </form>
        </div>
    )
}
