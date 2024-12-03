import useCurrentUser from "./useCurrentUser";

function UserPhoto() {
  const {
    user: { user },
  } = useCurrentUser();

  return (
    <div className="w-[45px] h-[45px] text-[#475569]  font-semibold bg-[#F1F5F9] rounded-full flex items-center justify-center">
      {user.name.charAt(0).toUpperCase()}
      {user.lastname.charAt(0).toUpperCase()}
    </div>
  );
}

export default UserPhoto;
