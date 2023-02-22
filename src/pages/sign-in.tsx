import { NextPage } from 'next';
import { SignInForm } from '@/components/forms';

const SignIn: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img
        src="https://www.jackdaniels.com/themes/JDTheme2/css/img/navLogo.png"
        alt="Jack Daniel's"
        className="mb-6 w-32"
      />
      <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-white">
        어드민 로그인
      </h2>
      <SignInForm />
    </div>
  );
};

export default SignIn;
