/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-27 17:34
 */


'use strict';

var Tips = require('../src/index');

var defaultEl = document.getElementById('default');
var successEl = document.getElementById('success');
var dangerEl = document.getElementById('danger');
var infoEl = document.getElementById('info');
var warnEl = document.getElementById('warn');

defaultEl.onclick = function () {
    new Tips({
        type: 'default',
        message: 'default'
    }).open();
};

successEl.onclick = function () {
    new Tips({
        type: 'success',
        message: 'success'
    }).open();
};

dangerEl.onclick = function () {
    new Tips({
        type: 'danger',
        message: 'danger'
    }).open();
};

infoEl.onclick = function () {
    new Tips({
        type: 'info',
        message: 'info'
    }).open();
};

warnEl.onclick = function () {
    new Tips({
        type: 'warn',
        message: 'index.js:167 不建议使用 `.parent` 来调用祖先原型方法，请使用 `.superInvoke` 代替。该方法将在下个版本被废除'
    }).open();
};

