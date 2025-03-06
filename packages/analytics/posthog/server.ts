import 'server-only';
import { PostHog } from 'posthog-node';
import { keys } from '../keys';

const { NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST } = keys();

if (!NEXT_PUBLIC_POSTHOG_KEY || !NEXT_PUBLIC_POSTHOG_HOST) {
  throw new Error('PostHog configuration is missing');
}

export const analytics = new PostHog(NEXT_PUBLIC_POSTHOG_KEY, {
  host: NEXT_PUBLIC_POSTHOG_HOST,

  // Don't batch events and flush immediately - we're running in a serverless environment
  flushAt: 1,
  flushInterval: 0,
});
