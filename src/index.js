/**
 * ui/Tips
 * @author ydr.me
 * @create 2016-04-26 19:20
 */


define(function (require, exports, module) {
    /**
     * @module ui/Tips
     * @requires ui/Popup
     * @requires utils/object
     * @requires classes/Animation
     * @requires core/attribute
     */

    'use strict';

    var UI = require('../index.js');
    var Popup = require('../popup/index.js');
    var object = require('../../utils/object.js');
    var Animation = require('../../classes/animation.js');
    var attribute = require('../../core/attribute.js');

    var namespace = UI.UI_CLASS + '-tips';
    var defaults = {
        type: 'default',
        addClass: '',
        message: '',
        timeout: 5000,
        /**
         * 打开窗口的动画
         * @type Null|Function
         */
        openAnimation: function (to, done) {
            var el = this.getElement();
            var an = new Animation(el);

            attribute.style(el, {
                display: 'block',
                transform: {
                    translateY: '-100%'
                }
            });

            to.transform = {
                translateY: 0
            };
            an.transit(to, {
                duration: 234,
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
            var el = this.getElement();
            var an = new Animation(el);

            attribute.style(el, {
                display: 'block',
                transform: {
                    translateY: 0
                }
            });

            to.transform = {
                translateY: '-100%'
            };
            an.transit(to, {
                duration: 234,
                easing: 'in-out'
            });
            an.start(done);
            an.destroy();
        }
    };
    var Tips = Popup.extend({
        className: 'Tips',
        constructor: function (options) {
            var the = this;

            options = object.assign(true, {}, defaults, options);
            the.Super({
                mask: false,
                height: 'auto',
                top: 0,
                bottom: 'auto',
                openAnimation: options.openAnimation,
                closeAnimation: options.closeAnimation
            });

            // init node
            var className = [
                namespace,
                namespace + '_' + options.type,
                options.addClass
            ].join(' ');
            var html = '<div class="' + className + '">' + options.message + '</div>';
            the.Super.setHTML(html);

            // init event
            var timeout = options.timeout;

            the.on('afterOpen', function () {
                clearTimeout(the[_timeId]);

                if (timeout > 0) {
                    the[_timeId] = setTimeout(function () {
                        the.close();
                    }, timeout);
                }
            });
        },

        /**
         * 销毁实例
         */
        destroy: function () {
            var the = this;

            clearTimeout(the[_timeId]);
            the.Super.destroy();
        }
    });
    var _timeId = Tips.sole();

    require('./style.css', 'css|style');
    Tips.defaults = defaults;
    module.exports = Tips;
});