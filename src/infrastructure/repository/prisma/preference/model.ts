type Preference = {
  id?: number;
  userId?: number;
  minAge: number;
  maxAge: number;
  maxDistance: number;
};

type InsertPreference = {
  userId: number;
  minAge: number;
  maxAge: number;
  maxDistance: number;
};

export { Preference, InsertPreference };
