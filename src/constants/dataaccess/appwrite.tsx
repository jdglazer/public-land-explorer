import { Account, Client } from "appwrite";

const APPWRITE_ENDPOINT = "https://tor.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "6a11fbaf0025f245fc1c";

const client = new Client();

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
