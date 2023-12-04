import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { TabsProvider, ThemeProvider, ToastProvider } from './components'
import { router } from './routes'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.message.includes('401')) {
        setTimeout(() => {
          queryClient.clear()
        }, 100)
      }
    },
  }),
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: false,
    },
  },
})

function App() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TabsProvider>
            <RouterProvider router={router} />
          </TabsProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ToastProvider>
  )
}

export default App
