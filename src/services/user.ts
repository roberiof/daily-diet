import firestore from "@react-native-firebase/firestore";


export class UsersService {
  async createUser(credentials: CreateUserDTO): Promise<IUser> {
    return new Promise((resolve, reject) => {
      firestore()
        .collection("users")
        .doc(credentials.id)
        .set({
          email: credentials.email,
          classesIds: [credentials.classId],
          name: null,
          theme: null,
          photoUrl: null,
          allianceId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: credentials.institutionId,
          role: "student",
          timesAtPodium: 0,
          modality: credentials.modality
        })
        .then(() => {
          resolve({
            id: credentials.id,
            email: credentials.email,
            classId: credentials.classId,
            name: null,
            theme: null,
            photoUrl: null,
            allianceId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            institutionId: credentials.institutionId,
            role: "student",
            timesAtPodium: 0,
            modality: credentials.modality
          });
        })
        .catch((error) => reject(error));
    });
  }

  async updateUser(data: UpdateUserDTO): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firestore()
        .collection("users")
        .doc(data.userId)
        .update({
          name: data.name,
          theme: data.theme,
          photoUrl: data.photoUrl
        })
        .then(() => {
          resolve(true);
        })
        .catch((error) => reject(error));
    });
  }

  async updateUserAlliance(data: {
    allianceId: string | null;
    userId: string;
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firestore()
        .collection("users")
        .doc(data.userId)
        .update({
          allianceId: data.allianceId
        })
        .then(() => {
          resolve(true);
        })
        .catch((error) => reject(error));
    });
  }

  async updateUserTimesAtPodium(data: {
    timesAtPodium: number;
    userId: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      firestore()
        .collection("users")
        .doc(data.userId)
        .update({
          timesAtPodium: data.timesAtPodium
        })
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

  async findUserById(userId: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();

            if (data) {
              resolve({
                id: userId,
                email: data.email,
                classId: data.classesIds[0],
                name: data.name,
                theme: data.theme,
                photoUrl: data.photoUrl,
                allianceId: data.allianceId,
                createdAt: data.createdAt,
                institutionId: data.institutionId,
                role: data.role,
                updatedAt: data.updatedAt,
                timesAtPodium: data.timesAtPodium,
                modality: data.modality ?? null
              });
            }
          }
        })
        .catch((error) => reject(error));
    });
  }

  async findManyByAllianceId(allianceId: string): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      firestore()
        .collection("users")
        .where("allianceId", "==", allianceId)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            resolve([]);
          }

          const users: IUser[] = [];

          querySnapshot.forEach((item) => {
            const data = item.data();

            users.push({
              id: item.id,
              email: data.email,
              classId: data.classesIds[0],
              name: data.name,
              theme: data.theme,
              photoUrl: data.photoUrl,
              allianceId: data.allianceId,
              createdAt: data.createdAt,
              institutionId: data.institutionId,
              role: data.role,
              updatedAt: data.updatedAt,
              timesAtPodium: data.timesAtPodium,
              modality: data.modality ?? null
            });
          });

          resolve(users);
        })
        .catch((error) => reject(error));
    });
  }
}

export const usersService = new UsersService();
