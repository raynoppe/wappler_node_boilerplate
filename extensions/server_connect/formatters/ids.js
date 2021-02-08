// JavaScript Document
exports.shuuid = function() {
    var nwuuid = (+new Date()).toString(36);
    return nwuuid;
};
exports.secpin = function() {
    var newcode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1;
    return newcode;
};
