const xmlbuilder = require('xmlbuilder');

exports.calc = (obj) => {
    let rc = `<response request=${obj.request.$.id}>Parse error</response>`;
    try {
        let xmldoc = xmlbuilder.create('response');
        xmldoc.att('request', obj.request.$.id);
        let sum = 0;
        let concStr = '';
        let arr_x = obj.request.x;
        let arr_m = obj.request.m;
        for (let i = 0; i < arr_x.length; i++) {
            sum += Number(arr_x[i].$.value);
        };
        for (let i = 0; i < arr_m.length; i++) {
            concStr += arr_m[i].$.value;
        };
        xmldoc.ele('sum').att('element', 'x').att('result', sum);
        xmldoc.ele('concat').att('element', 'm').att('result', concStr);
        rc = xmldoc.toString({pretty:true});
    } catch (e) {
        console.log(e);
    }
    return rc;
};