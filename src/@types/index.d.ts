export {};

declare global {
    namespace Express {
      interface Request {
        payload?: {[args: string]:any};
      }
    }
  }