type Message = {
  id?: number;
  matchId: number;
  senderId: number;
  receiverId: number;
  content: string;
  isRead: boolean;
  timestamp: Date;
};

export { Message };
