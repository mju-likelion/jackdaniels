import { NextPage } from 'next';
import { SignInForm } from '@/components/forms';

const SignIn: NextPage = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <img
        src="https://www.jackdaniels.com/themes/JDTheme2/css/img/navLogo.png"
        alt="Jack Daniel's"
        className="w-32 mb-6"
      />
      <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-white">
        어드민 로그인
      </h2>
      <SignInForm />
    </div>
  );
};

export default SignIn;
