import { FC } from 'react';

export const SignInForm: FC = () => {
  return (
    <form className="flex flex-col w-72 xs:w-full xs:m-8">
      <input
        type="email"
        name="email"
        autoComplete="email"
        required
        placeholder="이메일"
        className="bg-gray1 rounded-none rounded-t-md p-2.5 pl-3.5 outline-0 box-border border-gray3 border-b"
      />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
        placeholder="비밀번호"
        className="bg-gray1 rounded-none rounded-b-md p-2.5 pl-3.5 outline-0 box-border"
      />
      <button
        type="submit"
        className="bg-gray1 rounded-md p-2.5 mt-3.5 outline-0 box-border"
      >
        로그인
      </button>
    </form>
  );
};
