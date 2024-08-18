/* eslint-disable @typescript-eslint/no-explicit-any */
import storage from "@react-native-firebase/storage";

export const uploadImageToStorage = async (
  storagePath: string,
  imagePath: string,
  fileUri: string
): Promise<{ downloadURL: string | null; error: string | null }> => {
  try {
    const uploadTask = storage()
      .ref(storagePath)
      .child(imagePath)
      .putFile(fileUri);
    await uploadTask;
    const downloadURL = await storage()
      .ref(storagePath)
      .child(imagePath)
      .getDownloadURL();
    return { downloadURL, error: null };
  } catch (error) {
    console.error("Error uploading image: ", error);
    return { downloadURL: null, error: "Error uploading image" };
  }
};

export const deleteImageFromStorage = async (
  storagePath: string,
  imagePath: string
): Promise<{ error: string | null }> => {
  try {
    await storage().ref(storagePath).child(imagePath).delete();
    return { error: null };
  } catch (error) {
    console.error("Error deleting image: ", error);
    return { error: "Error deleting image" };
  }
};

export const getImageUrlFromStorage = async (
  storagePath: string,
  imagePath: string
): Promise<{ downloadURL: string | null; error: string | null }> => {
  try {
    const downloadURL = await storage()
      .ref(storagePath)
      .child(imagePath)
      .getDownloadURL();
    return { downloadURL, error: null };
  } catch (error) {
    console.error("Error getting image URL: ", error);
    return { downloadURL: null, error: "Error getting image URL" };
  }
};
