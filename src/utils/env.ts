import * as dotenv from 'dotenv';

export type TestEnv = {
  BASE_URL: string;
  USER_EMAIL?: string;
  USER_PASSWORD?: string;
};

export function loadEnv(): TestEnv {
  dotenv.config();
  const { BASE_URL, USER_EMAIL, USER_PASSWORD } = process.env;
  if (!BASE_URL) throw new Error('BASE_URL is required');
  return { BASE_URL, USER_EMAIL, USER_PASSWORD };
}