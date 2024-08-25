/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityIndicator, View } from "react-native";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useProfile } from "@/hooks/queries/useProfile";
import { AuthContextData } from "./types";

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userUid, setUserUid] = useState<string | null | undefined>(null);
  const [initializing, setInitializing] = useState(true);
  const { data: user, isLoading } = useProfile(userUid ?? undefined);

  // console.log(userUid);
  // console.log(user);
  // console.log(isLoading);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      setUserUid(user.uid);
    } else {
      setUserUid(null);
    }

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing || isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="#000" size={48} />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};