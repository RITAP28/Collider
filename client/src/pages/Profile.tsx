import { useAppSelector } from "../redux/hooks/hook";

const Profile = () => {
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.user
  );
  return (
    <div className="w-full">
        <div className="w-full bg-black text-white font-Poppins text-2xl flex justify-center py-4">
            {currentUser?.name}
        </div>
    </div>
  )
};

export default Profile;
