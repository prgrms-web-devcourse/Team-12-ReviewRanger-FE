import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <div></div>
        </Suspense>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
