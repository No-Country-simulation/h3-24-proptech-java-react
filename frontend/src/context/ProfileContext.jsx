import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { getProfileApi, updateProfileApi } from '../services/apiProfile';
import { isAxiosError } from 'axios';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [dataProfile, setDataProfile] = useState({});
  const [profile, setProfile] = useState(null);
  function setDataProfileForms(data) {
    console.log(data);
    setDataProfile({ ...dataProfile, ...data });
  }

  async function updateProfile() {
    try {
      const res = await updateProfileApi(dataProfile);
      setProfile(res);
      return true;
    } catch (error) {
      console.log(error);
      toast.error('Error al actualizar la data del perfil!');
      return false;
    }
  }
  async function getProfile() {
    try {
      const res = await getProfileApi();
      setProfile(res);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.code === 404
            ? error.response.data.message
            : 'Error al buscar el perfil'
        );
      }
      toast.error('Error al actualizar la data del perfil!');
    }
  }

  const rellenarDataProfile = () => {
    if (profile) {
      setDataProfile((prevDataProfile) => {
        const updatedDataProfile = { ...prevDataProfile };

        // Recorrer todas las claves de `profile` y actualizar solo las que están vacías en `dataProfile`
        Object.keys(profile).forEach((key) => {
          if (!updatedDataProfile[key]) {
            // Si no existe o está vacío en `dataProfile`
            updatedDataProfile[key] = profile[key]; // Actualizar con el valor de `profile`
          }
        });

        return updatedDataProfile;
      });
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        dataProfile,
        profile,
        setDataProfileForms,
        updateProfile,
        getProfile,
        rellenarDataProfile,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};
