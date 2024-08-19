import { SwipeDirection } from '../driver';

type Swipe = {
  id?: number;
  userId: number;
  candidateId: number;
  swipe: SwipeDirection;
  timestamp: Date;
};

export { Swipe, SwipeDirection };
