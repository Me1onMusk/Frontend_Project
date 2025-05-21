
import bcrypt from "bcryptjs";

// 비밀번호 솔팅 함수 (보안) //
export function saltAndHashPassword(password: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

// DB에 있는 비번 vs 입력 받은 비번 비교 함수 //
export function comparePasswords(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
}