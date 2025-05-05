// Add userId property to Express Request
declare namespace Express {
  interface Request {
    userId?: string;
  }
}