import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';

export class UserProfileManager {
    executor: PlatformExecutor;
    platform: string;

    constructor(executor: PlatformExecutor) {
        this.executor = executor;
        this.platform = executor.getPlatform();
    }

    /**
     * This interface will be used to know the login status of the User
     * @see {isLoggedIn}
     */
    isLoggedIn() {
        return new Promise<boolean>((resolve, reject) => {
            return this.executor.exec(
                'isLoggedIn',
                null,
                response => {
                    resolve(MiniAppBridgeUtils.BooleanValue(response));
                },
                error => reject(parseMiniAppError(error))
            );
        });
    }
}
