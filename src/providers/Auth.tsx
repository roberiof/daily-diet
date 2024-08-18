/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityIndicator, View } from "react-native";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  userUid: string | null | undefined;
  setUserUid: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userUid, setUserUid] = useState<string | null | undefined>(null);
  const [initializing, setInitializing] = useState(true);

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

  if (initializing) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="#000" size={48} />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        userUid,
        setUserUid
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
