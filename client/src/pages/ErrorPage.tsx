import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { isAxiosError } from 'axios';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;
  let errorStatus: number = 500;
  if (isAxiosError(error)) {
    errorMessage = error.response?.data.message;
    errorStatus = error.status as number;
  } else if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data.message || error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <section className="grid h-screen place-items-center bg-background text-foreground px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="font-semibold text-indigo-600 text-3xl">{errorStatus}</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          {errorMessage}
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button>
            <Link to="/" replace={true}>
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
