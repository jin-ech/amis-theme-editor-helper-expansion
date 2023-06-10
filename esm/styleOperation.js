/**
 * amis-theme-editor-helper v2.0.11-beta.2
 * Copyright 2018-2023 @fex
 */

function findOrCreactStyle(id) {
    var varStyleTag = document.getElementById(id);
    if (!varStyleTag) {
        varStyleTag = document.createElement('style');
        varStyleTag.id = id;
        document.body.appendChild(varStyleTag);
    }
    return varStyleTag;
}
function insertStyle(style, id) {
    var varStyleTag = findOrCreactStyle(id);
    // bca-disable-line
    varStyleTag.innerHTML = style;
}
function addStyle(style, id) {
    var varStyleTag = findOrCreactStyle(id);
    // bca-disable-line
    varStyleTag.innerHTML += style;
}

export { addStyle, findOrCreactStyle, insertStyle };
