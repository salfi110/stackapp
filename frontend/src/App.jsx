import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>Simple App</h1>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <>
          <LoginForm onLogin={() => setIsLoggedIn(true)} />
          <RegisterForm />
        </>
      )}
    </div>
  );
}

export default App;
