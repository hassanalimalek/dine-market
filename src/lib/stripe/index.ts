import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (key && !stripePromise) {
    stripePromise = loadStripe(key);
  }

  return stripePromise;
};

export default getStripe;
