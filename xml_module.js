const isXML = (headers, header, mime) => {
    let rc = false;
    let h = headers[header];
    if (h) {
        rc = h.indexOf(mime) >= 0;
    }
    return rc;
};

exports.write400 = (res, smess) => {
    console.log(smess);
    res.writeHead(400, {'Content-Type':'text/html; charset=utf-8'});
    res.statusMessage = smess;
    res.end();
};

exports.write200 = (res, smess, mess) => {
    console.log(smess, mess);
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.statusMessage = smess;
    res.end(mess);
};

exports.isXMLContentType = (hs) => isXML(hs, 'content-type', 'application/xml');
exports.isXMLAccept = (hs) => isXML(hs, 'accept', 'application/xml');