import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { axios } from '@/api';
import { toast } from 'react-toastify';
import { instanceOf } from 'prop-types';
import { AxiosError } from 'axios';
import { PostLoginPayload } from '@/payloads/api/managers';
import { useManager } from '@/hooks';

type FormValues = {
  email: string;
  password: string;
};

export const SignInForm: FC = () => {
  const setAccessToken = useManager(state => state.setAccessToken);

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      const res = await axios.post<PostLoginPayload>(
        '/api/managers/login',
        data,
      );
      setAccessToken(res.data.data.accessToken);
      window.location.href = '/';
    } catch (e) {
      // TODO: 코드가 너무 더럽다.. 리팩토링하자..
      if (e instanceof AxiosError) {
        if (typeof e.response?.data.message === 'string') {
          toast.error(e.response?.data.message);
        } else if (Array.isArray(e.response?.data.message)) {
          e.response?.data.message.forEach((message: string) => {
            toast.error(message);
          });
        }
      } else {
        toast.error('알 수 없는 에러가 발생했습니다. 콘솔을 확인해주세요.');
        console.error(e);
      }
    }
  };

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
