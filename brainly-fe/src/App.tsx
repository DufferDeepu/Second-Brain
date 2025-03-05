import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Simple auth check function
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  // Protected route component
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/brain/:shareLink" 
            element={<Dashboard />} 
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;