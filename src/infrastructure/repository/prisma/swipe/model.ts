enum SwipeDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

type Swipe = {
  id?: number;
  userId: number;
  candidateId: number;
  swipe: SwipeDirection;
  timestamp: Date;
};

export { Swipe, SwipeDirection };
