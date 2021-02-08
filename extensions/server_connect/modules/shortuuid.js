exports.shortuuid = function() {
    console.log('called');
    var nwuuid = (+new Date()).toString(36);
    return nwuuid;
};