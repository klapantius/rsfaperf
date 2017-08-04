function PrintLog(text) {
    console.log(new Date().toLocaleString() + ' - ' + text);
}
function PrintError(text) {
    console.error(new Date().toLocaleString() + ' - ' + text);
}

module.exports = {PrintError, PrintLog};