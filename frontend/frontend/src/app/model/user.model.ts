export interface User {
    sub: string;          // Username
    email: string;             // Email address
    groups?: string[];          // Array of roles (optional)
  }
  