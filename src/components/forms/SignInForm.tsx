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
      className='xs:w-full xs:m-8 flex w-72 flex-col'
    >
      <input
        type='email'
        autoComplete='email'
        required
        placeholder='이메일'
        className='box-border rounded-none rounded-t-md border-b border-gray3 bg-gray1 p-2.5 pl-3.5 outline-0'
        {...register('email', {
          required: true,
          validate: email => isEmail(email),
        })}
      />
      <input
        type='password'
        autoComplete='current-password'
        required
        placeholder='비밀번호'
        className='box-border rounded-none rounded-b-md bg-gray1 p-2.5 pl-3.5 outline-0'
        {...register('password', { required: true })}
      />
      <button
        type='submit'
        className='mt-3.5 box-border rounded-md bg-gray1 p-2.5 outline-0'
      >
        로그인
      </button>
    </form>
  );
};
