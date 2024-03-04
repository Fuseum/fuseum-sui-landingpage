export function formatHexString(str: string) {

    var hexStr = '';
    for (var i = 0; i < str.length; i++) {
        hexStr += str.charCodeAt(i).toString(16);
    }

    // Lấy 5 ký tự đầu và 5 ký tự cuối
    var start = hexStr.substring(0, 5);
    var end = hexStr.substring(hexStr.length - 5);

    // Kết hợp chúng với 4 dấu chấm
    return '0x' + start + '....' + end;
}