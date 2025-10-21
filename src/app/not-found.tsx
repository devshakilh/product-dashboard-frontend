import NotFoundPage from '@/features/ui/error-pages/404.component';
import ErrorPage500 from '@/features/ui/error-pages/500.component';
import ErrorPage503 from '@/features/ui/error-pages/503.component';

interface ErrorProps {
  statusCode?: number;
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
  // Dynamically render the appropriate error component
  if (statusCode === 404) {
    return <NotFoundPage />;
  } else if (statusCode === 500) {
    return <ErrorPage500 />;
  } else if (statusCode === 503) {
    return <ErrorPage503 />;
  }

  // Default fallback for unknown errors
  return <NotFoundPage />;
};

ErrorPage.getInitialProps = ({
  res,
  err,
}: {
  res?: { statusCode?: number };
  err?: { statusCode?: number };
}): ErrorProps => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
};

export default ErrorPage;
