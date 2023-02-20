import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

type FormValues = {
  email: string;
  password: string;
};

export const SignInForm: FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-72 xs:w-full xs:m-8"
    >
      <input
        type="email"
        autoComplete="email"
        required
        placeholder="이메일"
        className="bg-gray1 rounded-none rounded-t-md p-2.5 pl-3.5 outline-0 box-border border-gray3 border-b"
        {...register('email', {
          required: true,
          validate: email => isEmail(email),
        })}
      />
      <input
        type="password"
        autoComplete="current-password"
        required
        placeholder="비밀번호"
        className="bg-gray1 rounded-none rounded-b-md p-2.5 pl-3.5 outline-0 box-border"
        {...register('password', { required: true })}
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
