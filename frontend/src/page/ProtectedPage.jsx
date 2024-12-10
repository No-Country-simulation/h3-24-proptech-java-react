import { useUser } from '../context/UserContext';
import useCurrentUser from '../features/user/useCurrentUser';

function ProtectedPage() {
  const { user } = useUser();

  return (
    <div>
      <h1>😄 Hola {user.user.name}!</h1>
    </div>
  );
}

export default ProtectedPage;
