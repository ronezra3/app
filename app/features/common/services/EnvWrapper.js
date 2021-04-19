"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function EnvWrapper(ENV) {
    return {
        getLmsEndpoint: function () {
            return ENV.lmsEndpoint;
        }
    };
}
exports.EnvWrapper = EnvWrapper;
//# sourceMappingURL=EnvWrapper.js.map