type Subscription = {
  id: number | null;
  userId: number;
  packageId: number;
  startDate: Date;
  endDate: Date | null;
};

export { Subscription };

// id           Int    @id @default(autoincrement())
//   packageId    Int
//   userId       Int
//   startDate    DateTime
//   endDate      DateTime?
