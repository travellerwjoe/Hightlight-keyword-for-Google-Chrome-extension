/**
 * Created by Joe.Wu on 16/11/2.
 */

function Highlight() {
    this.init();
}
Highlight.prototype = {
    init: function () {
        this.start();
        // this.bind();
    },
    //从搜索结果中获取关键字，中文包括搜索结果中的繁体字
    retrieveKeyword: function () {
        var keywords = [],
            inputEl = document.getElementById('lst-ib'),
            emEl = document.getElementsByTagName('em');
        if (inputEl.value) {
            keywords.push(inputEl.value);
        }
        if (emEl.length) {
            for (var i = 0; i < emEl.length; i++) {
                var text = emEl[i].innerText || emEl[i].textContent;
                if (text && keywords.indexOf(text) < 0) {
                    keywords.push(text);
                }
            }
        }
        return keywords;
    },
    //遍历结果标题并嵌套em标签将其高亮显示
    highlight: function () {
        var keywords = this.retrieveKeyword(),
            ires = document.getElementById('ires'),
            aEl = ires.getElementsByTagName('a');
        if (aEl.length) {
            for (var i = 0; i < aEl.length; i++) {
                var text = aEl[i].innerText || aEl[i].textContent,
                    pattern = new RegExp(keywords.join('|'),'gim'),
                    flag = pattern.test(text),
                    html;
                if (flag) {
                    html = text.replace(pattern, '<em>$&</em>');
                    aEl[i].innerHTML = html;
                }
            }
        }
    },
    start: function () {
        //等待元素在异步动态添加后执行后续操作
        var s = setInterval(function () {
            var ires = document.getElementById('ires');
            if (ires) {
                clearInterval(s);
                this.highlight()
            }
        }.bind(this), 200);
    },
    bind: function () {
        // var searchBtn = document.querySelector('button[name=btnG][type=submit]'),
        //     _self = this;
        // searchBtn.addEventListener('click', function (e) {
        //     _self.highlight();
        // })
    }
}

new Highlight();