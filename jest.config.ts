import type { Config } from 'jest';

const config: Config = {
  "preset": "ts-jest",
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["dotenv/config"],
}

export default config;
