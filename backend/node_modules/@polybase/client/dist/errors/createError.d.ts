import { AxiosError } from 'axios';
import { ERROR_REASONS } from './constants';
import { PolybaseError, PolybaseErrorExtra } from './PolybaseError';
export declare function createError(reason: ERROR_REASONS, extra?: PolybaseErrorExtra): PolybaseError;
export declare function wrapError(err: any): PolybaseError;
export interface ErrorResponseData {
    error: {
        message: string;
        reason: string;
        code: string;
    };
}
export declare function createErrorFromAxiosError(err: AxiosError): PolybaseError;
//# sourceMappingURL=createError.d.ts.map