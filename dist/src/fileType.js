export var FileType;
(function (FileType) {
    FileType[FileType["JPG"] = 0] = "JPG";
    FileType["JPEG"] = "image/jpeg";
    FileType["PNG"] = "image/png";
    FileType["HEIC"] = "image/heic";
    FileType["MP3"] = "audio/mpeg";
    FileType["MP4"] = "video/mp4";
    FileType["WEBA"] = "audio/webm";
    FileType["WEBM"] = "video/webm";
    FileType["WEBP"] = "image/webp";
    FileType["ANY"] = "application/octet-stream";
})(FileType || (FileType = {}));
