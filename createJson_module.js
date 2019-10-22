exports.createResp = (obj) => {
    let resStr = `{"__comment": "Ответ. Лабораторная 8.10",
    "x_plus_y": ${obj.x + obj.y},
    "Concatination_s_o": "${obj.s}: ${obj.o.surname}, ${obj.o.name}",
    "Length_m": ${obj.m.length}}`;
    return resStr;
};