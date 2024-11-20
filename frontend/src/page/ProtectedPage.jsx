import useCurrentUser from "../features/user/useCurrentUser";

function ProtectedPage() {
  const { user } = useCurrentUser();

  return (
    <div>
      <h1>😄 Hola {user.user.name}!</h1>
    </div>
  );
}

export default ProtectedPage;
