import './global.css';
import Test from '@components/test';
import { UserProvider } from '@contexts/userContext';
import { UserContext } from '@utils/helpers';

export default function App() {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ user, loading }) =>
          loading ? <Test /> : user ? <Test /> : <Test />
        }
      </UserContext.Consumer>
    </UserProvider>
  );
}
