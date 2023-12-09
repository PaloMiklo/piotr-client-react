import * as Sentry from '@sentry/react';

export const SENTRY_ERROR = (error: unknown): void => { Sentry.captureException(new Error(JSON.stringify(error))) };