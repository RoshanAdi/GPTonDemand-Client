export class User {
  firstName: string;
  lastName: string;
  email: string;
  apiKey:string;

  constructor(firstName: string, lastName: string, email: string, apiKey:string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.apiKey = apiKey;
  }
}
