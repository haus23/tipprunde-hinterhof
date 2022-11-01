import { Suspense } from 'react';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true, staleTime: Infinity } },
});

// React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SplashScreen } from 'ui';
import { appRoutes } from './app.routes';
const router = createBrowserRouter(appRoutes);

function App() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
