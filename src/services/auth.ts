import auth from "@react-native-firebase/auth";

export class AuthServicesClass {
  async loginWithInternalService(
    email: string,
    password: string
  ): Promise<{ error: null | string }> {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve({
            error: null
          });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}

export const authServices = new AuthServicesClass();
