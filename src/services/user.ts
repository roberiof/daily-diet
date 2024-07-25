import { UserEntity } from "@/common/entities/User";
import firestore from "@react-native-firebase/firestore";

export class UsersService {
  async createUser(credentials: UserEntity): Promise<{ error: null | string }> {
    return new Promise((resolve, reject) => {
      firestore()
        .collection("users")
        .add(credentials as UserEntity)
        .then(() => {
          resolve({
            error: null
          });
        })
        .catch((error) => reject(error));
    });
  }
  async findUserById(id: string): Promise<UserEntity | null> {
    return new Promise((resolve, reject) => {
      firestore()
        .collection("users")
        .doc(id)
        .get()
        .then((data) => {
          resolve({ ...data.data(), id: data.id } as UserEntity);
        })
        .catch((error) => {
          console.log(error);
          reject(null);
        });
    });
  }
}

export const usersService = new UsersService();
