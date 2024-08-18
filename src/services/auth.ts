/* eslint-disable @typescript-eslint/no-explicit-any */
import auth from "@react-native-firebase/auth";

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<{ error: null | string }> => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return { error: null };
  } catch (error: any) {
    console.error("Error logging in: ", error);

    let errorMessage = "An unexpected error occurred during login.";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "The email address is invalid.";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled.";
        break;
      case "auth/user-not-found":
        errorMessage = "No user found with this email.";
        break;
      case "auth/wrong-password":
        errorMessage = "The password is incorrect.";
        break;
      default:
        errorMessage = "An unexpected error occurred during login.";
    }

    return { error: errorMessage };
  }
};

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<{ error: null | string; userId: string | null }> => {
  try {
    const data = await auth().createUserWithEmailAndPassword(email, password);
    return { error: null, userId: data.user.uid };
  } catch (error) {
    console.error("Error creating user: ", error);
    return { error: "Error in user creation", userId: null };
  }
};
