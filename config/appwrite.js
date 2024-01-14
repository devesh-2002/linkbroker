import { Client, Databases, Account } from "appwrite";

export const config = {
  APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
  APPWRITE_DOCUMENT_ID : process.env.NEXT_APPWRITE_DOCUMENT_ID,
  APPWRITE_COLLECTION_ID : process.env.NEXT_APPWRITE_COLLECTION_ID,
};
export const handleGoogleLogin = async () => {
  try {
    await account.createOAuth2Session(
      'google',
      'http://localhost:3000', // Success URL
      'http://localhost:3000' // Failure URL
    );
    checkAuthentication();
  } catch (error) {
    console.error('Google authentication failed:', error);
  }
};

export const client = new Client().setEndpoint(config.APPWRITE_ENDPOINT).setProject(config.APPWRITE_PROJECT);
export const account = new Account(client);
export const database = new Databases(client);
