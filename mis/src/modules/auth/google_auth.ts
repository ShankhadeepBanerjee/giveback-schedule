import {FirebaseError} from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  OAuthCredential,
} from 'firebase/auth';
import {FirebaseApp} from 'modules/login/firebase';
import {createGoogleUserProfile, UserProfile} from 'models/user';
import {Cookie, setCookie} from 'state/cookies';

export const googleSignIn = async () => {
  const auth = getAuth(FirebaseApp);
  // Setting preferred language for authentication.
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();
  // We need to get only email and profile information from authentication.
  provider.addScope('email');
  provider.addScope('profile');
  try {
    const userCredential = (await signInWithPopup(
      auth,
      provider,
    )) as UserCredential;
    const oAuthCred = GoogleAuthProvider.credentialFromResult(
      userCredential,
    ) as OAuthCredential;
    const authUser = userCredential.user;
    // TODO: Save in Cookies and Redux.
    const idTokenResult = await auth.currentUser?.getIdTokenResult();
    const userProfile = createGoogleUserProfile(
      authUser,
      oAuthCred,
      idTokenResult,
    );
    saveData(userProfile);
    return userProfile;
  } catch (error) {
    console.log(error);
    if (!(error instanceof FirebaseError)) {
      return;
    }
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(
      `errorCode: ${errorCode} 
    \n errorMessage: ${errorMessage} 
    \n credential: ${credential}`,
    );
  }
  return;
};

function saveData(userProfile: UserProfile) {
  // userProfile.googleCreds.
  setCookie(<Cookie>{
    key: 'accessToken',
    value: userProfile.googleCreds.accessToken,
  });
}