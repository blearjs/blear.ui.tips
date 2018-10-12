/**
 * ui/Tips
 * @author ydr.me
 * @create 2016-04-26 19:20
 * @update 2017年02月11日11:06:57
 */



'use strict';

var Window = require('blear.ui.window');
var object = require('blear.utils.object');
var Animation = require('blear.classes.animation');
var attribute = require('blear.core.attribute');
var event = require('blear.core.event');
var Template = require('blear.classes.template');

var tpl = new Template(require('./template.html'));
var defaults = object.assign({}, Window.defaults, {
    // 内置 default、success、danger、info、warn
    type: 'default',
    addClass: '',
    message: '',
    timeout: 2345,
    /**
     * 打开窗口的动画
     * @type Null|Function
     */
    openAnimation: function (to, done) {
        var el = this.getWindowEl();
        var an = new Animation(el);

        attribute.style(el, {
            display: 'block',
            opacity: 0,
            transform: {
                scale: 0
            }
        });

        to.opacity = 1;
        to.transform = {
            scale: 1
        };
        an.transit(to, {
            duration: 345,
            easing: 'in-out'
        });
        an.start(done);
        an.destroy();
    },


    /**
     * 关闭窗口的动画
     * @type Null|Function
     */
    closeAnimation: function (to, done) {
        var el = this.getWindowEl();
        var an = new Animation(el);

        attribute.style(el, {
            display: 'block'
        });

        to.opacity = 0;
        to.transform = {
            scale: 0
        };
        an.transit(to, {
            duration: 345,
            easing: 'in-out'
        });
        an.start(done);
        an.destroy();
    }
});
var Tips = Window.extend({
    className: 'Tips',
    constructor: function (options) {
        var the = this;

        options = object.assign({}, defaults, options);
        options.width = 'auto';
        Tips.parent(the, options);
        the.setHTML(tpl.render({
            options: options
        }));

        var timeout = options.timeout;

        the.on('afterOpen', function () {
            clearTimeout(the[_timeId]);

            if (timeout > 0) {
                the[_timeId] = setTimeout(function () {
                    the.close();
                }, timeout);
            }
        });
        event.on(the.getWindowEl(), 'click', function () {
            clearTimeout(the[_timeId]);
            the.close();
        });
    },

    /**
     * 销毁实例
     */
    destroy: function () {
        var the = this;

        clearTimeout(the[_timeId]);
        Tips.invoke('destroy', the);
    }
});
var _timeId = Tips.sole();

require('./style.css', 'css|style');
Tips.defaults = defaults;
module.exports = Tips;
