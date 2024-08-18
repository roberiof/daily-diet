import auth from "@react-native-firebase/auth";

export class AuthServicesClass {
  async loginWithInternalService(
    email: string,
    password: string
  ): Promise<{ error: null | string }> {
    return new Promise((resolve) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve({
            error: null
          });
        })
        .catch((error) => {
          console.log(error);
          resolve(error);
        });
    });
  }

  async createUserWithInternalService(
    email: string,
    password: string
  ): Promise<{ error: null | string; userId: string | null }> {
    return new Promise((resolve) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          resolve({ error: null, userId: data.user.uid });
        })
        .catch((error) => {
          console.log(error);
          resolve({ error: error.message, userId: null });
        });
    });
  }
}

export const authServices = new AuthServicesClass();
