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
    console.error("Error logging in: ", error.code);

    let errorMessage =
      "An unexpected error occurred during login. Try again later";

    switch (error.code) {
      case "auth/invalid-credential":
        errorMessage = "The credentials are invalid.";
        break;
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
        errorMessage =
          "An unexpected error occurred during login. Try again later";
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
  } catch (error: any) {
    console.error("Error creating user: ", error);

    let errorMessage =
      "An unexpected error occurred during login. Try again later";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Email already in use.";
        break;
      default:
        errorMessage =
          "An unexpected error occurred during login. Try again later";
    }
    return { error: errorMessage, userId: null };
  }
};

export const logout = async (): Promise<{
  error: null | string;
}> => {
  try {
    await auth().signOut();
    return { error: null };
  } catch (error) {
    console.error("Error creating user: ", error);
    return { error: "Error in logout" };
  }
};
