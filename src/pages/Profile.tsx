import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  useDeleteUser,
  useUpdateUserProfile,
  useUserProfile,
} from "../hooks/useUserProfile";

function Profile() {
  const { user } = useAuth();

  const { data, isLoading } =
    useUserProfile(user?.uid);

  const updateProfile =
    useUpdateUserProfile();

  const deleteUser =
    useDeleteUser();

  const [name, setName] =
    useState("");

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setAddress(data.address);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user || !data) {
    return null;
  }

  const handleUpdate = () => {
    updateProfile.mutate({
      uid: user.uid,
      updates: {
        name,
        address,
      },
    });
  };

  return (
    <main>
      <h1>My Profile</h1>

      <p>Email: {data.email}</p>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
      />

      <button onClick={handleUpdate}>
        Save Changes
      </button>

      <button
        onClick={() =>
          deleteUser.mutate(user.uid)
        }
      >
        Delete Account
      </button>
    </main>
  );
}

export default Profile;