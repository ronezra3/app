"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("../../activities/services/ResourceWrapper");
/*@ngInject*/
function Participant($resource, ENV) {
    return new ResourceWrapper_1.ActivityResourceWrapper($resource, ENV, 'participants').get();
}
exports.Participant = Participant;
//# sourceMappingURL=ParticipantFactory.js.map