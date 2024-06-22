/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityIndicator, View } from "react-native";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import "../config/firebase";
import { getAuth } from "firebase/auth";
import firebaseApp from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  userUid: string | null | undefined;
  setUserUid: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

const AuthContext = createContext({} as AuthContextData);
const auth = getAuth(firebaseApp);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userUid, setUserUid] = useState<string | null | undefined>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("auth enterred");
      if (user) {
        setUserUid(user.uid);
        console.log("defined");
      } else {
        setUserUid(undefined);
        console.log("undefined");
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  if (initializing) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="#1836B2" size={48} />
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
