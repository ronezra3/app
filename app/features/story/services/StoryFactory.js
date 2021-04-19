"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("./ResourceWrapper");
/*@ngInject*/
function Story($resource, ENV, CurrentUser, lodash) {
    return new ResourceWrapper_1.StoryResourceWrapper($resource, ENV, CurrentUser, lodash).get();
}
exports.Story = Story;
//# sourceMappingURL=StoryFactory.js.map