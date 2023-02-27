import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainRoutes from './routes'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainRoutes></MainRoutes>
      </QueryClientProvider>
   </>
  )
}

export default App
