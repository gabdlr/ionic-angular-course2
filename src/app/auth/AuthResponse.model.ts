export interface AuthResponse {
  /**
   * The email for the authenticated user.
   */
  email: string;
  /**
   * The number of seconds in which the ID token expires.
   */
  expiresIn: string;
  /**
   * A Firebase Auth ID token for the authenticated user.
   */
  idToken: string;
  /**
   * The uid of the authenticated user.
   */
  localId: string;
  /**
   * A Firebase Auth refresh token for the authenticated user.
   */
  refreshToken: string;
  /**
   * Whether the email is for an existing account.
   */
  registered?: boolean;
}
