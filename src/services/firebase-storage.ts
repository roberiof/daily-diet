import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";

class FirebaseStorageService {
  private storageRef: FirebaseStorageTypes.Reference;

  constructor(storagePath: string) {
    this.storageRef = storage().ref(storagePath);
  }

  async uploadImage(imagePath: string, fileUri: string): Promise<string> {
    try {
      const uploadTask = this.storageRef.child(imagePath).putFile(fileUri);
      await uploadTask;
      const downloadURL = await this.storageRef
        .child(imagePath)
        .getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Error uploading image");
    }
  }

  async deleteImage(imagePath: string): Promise<void> {
    try {
      await this.storageRef.child(imagePath).delete();
    } catch (error) {
      console.error("Error deleting image: ", error);
      throw new Error("Error deleting image");
    }
  }

  async getImageUrl(imagePath: string): Promise<string> {
    try {
      const downloadURL = await this.storageRef
        .child(imagePath)
        .getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error("Error getting image URL: ", error);
      throw new Error("Error getting image URL");
    }
  }
}

export default FirebaseStorageService;
