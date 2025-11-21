import type * as t from './types';
export default function createPayload(submission: t.TSubmission): {
    server: string;
    payload: t.TPayload;
};
