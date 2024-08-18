import { CustomError } from '.';

class PaymentNeededError extends CustomError {
  constructor(
    message?: string,
    public content?: any
  ) {
    super(
      402,
      message ||
        'You need to upgrade your subscription to access this resource!'
    );
    this.name = 'PaymentNeededError';
    this.content = content;

    // Restore prototype chain
    Object.setPrototypeOf(this, PaymentNeededError.prototype);
  }
}

export default PaymentNeededError;
