import { ERROR_CODES, ERROR_REASONS } from './constants';
export interface PolybaseErrorExtra {
    /** Message that can be presented to the user */
    message?: string;
    /** The status code or error group */
    code?: keyof typeof ERROR_CODES;
    /** Status code */
    statusCode?: number;
    /** Data that can be presented to the user */
    data?: any;
    /** Original error message before normalization */
    originalError?: Error;
}
export declare class PolybaseError extends Error {
    reason: ERROR_REASONS;
    /** The status code or error group */
    code?: keyof typeof ERROR_CODES;
    /** Status code */
    statusCode?: number;
    /** Data that can be presented to the user */
    data?: any;
    /** Original error message before normalization */
    originalError?: Error;
    constructor(reason: ERROR_REASONS, extra?: PolybaseErrorExtra);
}
//# sourceMappingURL=PolybaseError.d.ts.map