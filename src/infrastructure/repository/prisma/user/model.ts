import { Gender } from '../driver';

type User = {
  id?: number;
  email: string;
  password: string;
  name: string;
  birthdate: Date;
  photoUrls: string;
  gender: Gender;
  location: string;
  bio: string;
  hobbies: string;
};

type Profile = {
  name: string;
  birthdate: Date;
  location: string;
  bio: string;
  hobbies: string;
};

export { User, Profile };
