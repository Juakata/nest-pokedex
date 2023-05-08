declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    MONGO_URL: string;
  }
}
