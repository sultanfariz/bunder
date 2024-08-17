type Package = {
  id: number | null;
  name: string;
  swipeQuota: number;
  verifiedLabel: boolean;
};

export { Package };

// model Package {
//   id           Int    @id @default(autoincrement())
//   name         String
//   swipeQuota   Int
//   verifiedLabel String

//   users        User[] @relation(name: "package")
// }
