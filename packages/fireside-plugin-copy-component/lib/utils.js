"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOlderThanXMins = void 0;
exports.isOlderThanXMins = function (dateString) {
    var date = new Date(dateString);
    var currentTime = new Date();
    var differenceInMilliseconds = currentTime.getTime() - date.getTime();
    var differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    return differenceInMinutes > 5;
};
//# sourceMappingURL=utils.js.map