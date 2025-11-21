import type { NextFunction, Request, Response } from 'express';
import type { CustomError } from '~/types';
export declare const ErrorController: (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => Response | void;
//# sourceMappingURL=error.d.ts.map