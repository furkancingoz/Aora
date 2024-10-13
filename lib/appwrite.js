import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.furkancingoz.aora',
    projectId: '670bda86002ce4d8f996',
    databaseId: '670bdca600378376d0e3',
    userCollectionId: '670bdcb9003dc176ce9f',
    videoCollectionId: '670bdccf001d3b02d9a6',
    storageId: '670bde000028bd7cfcbe'
}


const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email,password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.log(error, "burası mı");
        throw new Error(error)
    }
}


export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        
        return session;
    } catch (error) {
      throw new Error(error);
    }
  }
