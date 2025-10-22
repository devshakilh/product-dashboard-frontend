import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unauthorized',
};

const Login = () => {
  return (
    <div className="mt-10 text-center">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="text-gray-600">
        You don&apos;t have permission to view this page.
      </p>
    </div>
  );
};

export default Login;
