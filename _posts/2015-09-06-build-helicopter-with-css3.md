---
layout: post
title:  利用CSS3动画创建直升机
subline: Build Helicopter With CSS3
categories: frontend
tags: [css3, animation]
---

今天我给大家展示一个好玩的东西，怎么用css3让一架直升机动起来！ [查看demo](http://www.zhuowenli.com/demo/helicopter/index.html)

[![][1]](http://www.zhuowenli.com/demo/helicopter/index.html)



##HTML

让我们看看主要代码： [查看代码](https://github.com/zhuowenli/Helicopter)

```html
<div class="helicopters">
    <div class="helicopter">
        <div class="body">
            <div class="propeller">
                <span class="pillar"></span>
                <span class="bar"></span>
            </div>
            <div class="spoiler">
                <span class="pillar"></span>
                <span class="bar"></span>
            </div>
        </div>
        <div class="foot"></div>
    </div>
    <div class="house"></div>
</div>
```
如图，这是直升机的身体：

![][2]

我们砍掉两个螺旋桨，以及直升机的底座，然后利用html来模拟直升机的螺旋桨。

##CSS

绘制直升机的样式：

```css
// scss
$yellow: #ffb50c;
$gray: #484757;
$red: #bf3616;

.helicopters{
    .helicopter{
        position: absolute;
        bottom: 191px;
        left: 175px;
        width: 194px;
        height: 71px;
        @include transition(all 2s ease-in-out);
        .body{
            position: absolute;
            width: 194px;
            height: 71px;
            background:transparent url('../img/body.png') left top no-repeat;
            @include transition(all 0.8s ease-in-out);
            z-index: 80;
        }
        .propeller{
            position: absolute;
            display: inline-block;
            left: 108px;
            top: 1px;
            @include transform(translateX(-50%));
            .pillar{
                width: 7px;
                height: 10px;
                background: #464857;
            }
            .bar{
                position: absolute;
                left: 50%;
                top: 2px;
                width: 170px;
                height: 3px;
                margin-left: -85px;
                background: #464857;
                &:before{
                    content: '';
                    display: block;
                    position: absolute;
                    left: 0;
                    width: 11px;
                    height: 3px;
                    background: #ffb40c;
                }
                &:after{
                    @extend .bar:before;
                    right: 0;
                    left: auto;
                }
            }
        }
        .spoiler{
            position: absolute;
            display: inline-block;
            top: 21px;
            left: 17px;
            width: 9px;
            height: 9px;
            .pillar{
                position: relative;
                width: 10px;
                height: 10px;
                background: $red;
                border-radius: 10px;
                &:before{
                    position: absolute;
                    content: '';
                    display: block;
                    width: 6px;
                    height: 6px;
                    top: 2px;
                    left: 2px;
                    background: $yellow;
                    border-radius: 6px;
                    z-index: 100;
                }
            }
            .bar{
                position: absolute;
                left: 50%;
                top: 4px;
                width: 28px;
                height: 3px;
                margin-left: -14px;
                background: #464857;
                &:before{
                    content: '';
                    display: block;
                    position: absolute;
                    left: 0;
                    width: 2px;
                    height: 3px;
                    background: #ffb40c;
                }
                &:after{
                    @extend .bar:before;
                    left: 26px;
                }
            }
        }
        .foot{
            position: absolute;
            left: 85px;
            bottom: 1px;
            width: 75px;
            height: 3px;
            background: $gray;
            z-index: 10;
            &:before{
                content: '';
                display: inline-block;
                position: absolute;
                width: 3px;
                height: 7px;
                left: 8px;
                top: -7px;
                background: $gray;
            }
            &:after{
                @extend .foot:before;
                left: 45px;
            }
        }
    }
    .house{
        width: 100%;
        height: 100%;
        background:transparent url('../img/hospital.png') center bottom no-repeat;
    }
}
```

利用keyframes创建帧动画：

```css
// scss
@include keyframes(rotationY){
    0%{
        @include transform(rotateY(0));
    }
    50%{
        @include transform(rotateY(180deg));
    }
    100%{
        @include transform(rotateY(360deg));
    }
}
@include keyframes(rotationZ){
    0%{
        @include transform(rotateZ(0));
    }
    50%{
        @include transform(rotateZ(180deg));
    }
    100%{
        @include transform(rotateZ(360deg));
    }
}

@include keyframes(fly){
    0%{
        @include transform(translateY(-60px) translateX(0));
    }
    30%{
        @include transform(translateY(-60px) translateX(400px));
        opacity: 1;
    }
    31%{
        opacity: 0;
    }
    34%{
        opacity: 0;
        @include transform(translateY(-60px) translateX(-400px));
    }
    35%{
        opacity: 1;
        @include transform(translateY(-60px) translateX(-400px));
    }
    100%{
        @include transform(translateY(-60px) translateX(0));
    }
};

@include keyframes(rotationBody){
    0%{
        @include transform(none);
    }
    80%{
        @include transform(rotate(2deg) translateY(3px));
    }
    100%{
        @include transform(none);
    }
}
```

利用jq创建动画队列：

```js
var helicopter = $('.helicopters'),
    isAction  = false;

function action(){
    if (!isAction) {
        isAction = true;
        helicopter.addClass('action');

        // 加载队列
        helicopter
            .delay(1000, 'class')
            .queue('class', function(next){
                helicopter.addClass('active');
                next();
            })
            .delay(1000, 'class')
            .queue('class', function(next){
                helicopter.addClass('one');
                helicopter.removeClass('action');
                next();
            })
            .delay(1000, 'class')
            .queue('class', function(next){
                helicopter.addClass('two');
                helicopter.removeClass('active');
                next();
            })
            .delay(1000, 'class')
            .queue('class', function(next){
                helicopter.addClass('three');
                helicopter.removeClass('one');
                next();
            })
            .delay(1000, 'class')
            .queue('class', function(next){
                helicopter.addClass('four');
                helicopter.removeClass('two');
                next();
            })
            .delay(1500, 'class')
            .queue('class', function(next){
                helicopter.addClass('five');
                next();
            })
            .delay(1500, 'class')
            .queue('class', function(next){
                helicopter.addClass('six');
                helicopter.removeClass('three');
                helicopter.removeClass('four');
                next();
            })
            .delay(1500, 'class')
            .queue('class', function(next){
                helicopter.addClass('seven');
                helicopter.removeClass('five');
                helicopter.removeClass('six');
                next();
            })
            .delay(10000, 'class')
            .queue('class', function(next){
                helicopter.addClass('eight');
                helicopter.removeClass('seven');
                next();
            })
            .delay(500, 'class')
            .queue('class', function(next){
                helicopter.addClass('nine');
                helicopter.removeClass('eight');
                next();
            })
            .delay(2000, 'class')
            .queue('class', function(next){
                helicopter.addClass('ten');
                helicopter.removeClass('nine');
                next();
            })
            .delay(2500, 'class')
            .queue('class', function(next){
                helicopter.addClass('end');
                helicopter.removeClass('ten');
                next();
            })
            .delay(2000, 'class')
            .queue('class', function(next){
                helicopter.addClass('over');
                helicopter.removeClass('end');
                next();
            })
            .delay(3000, 'class')
            .queue('class', function(){
                helicopter.removeClass('over');
                isAction  = false;
            })
            .dequeue('class');
    };
}

action();

helicopter.bind('click', function(){
    action();
})
```
相应的css代码

```css
// scss
.helicopters{
    &.action{
        .helicopter .spoiler .bar{
            @include animation(rotationZ 1s linear infinite);
        }
    }
    &.active{
        .helicopter{
            .propeller .bar{
                @include animation(rotationY 1s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 1s linear infinite);
            }
        }
    }
    &.one{
        .helicopter{
            .propeller .bar{
                @include animation(rotationY 0.8s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.6s linear infinite);
            }
            .body{
                @include animation(rotationBody 2s linear);
            }
        }
    }
    &.two{
        .helicopter{
            .propeller .bar{
                @include animation(rotationY 0.4s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.2s linear infinite);
            }
        }
    }
    &.three{
        .helicopter{
            @include transform(translateY(-60px) rotate(-5deg));
            .propeller .bar{
                @include animation(rotationY 0.4s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.2s linear infinite);
            }
        }
    }
    &.four{
        .helicopter{
            @include transform(translateY(-60px) rotate(-5deg));
            .propeller .bar{
                @include animation(rotationY 0.4s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.2s linear infinite);
            }
        }
    }
    &.five{
        .helicopter{
            @include transform(translateY(-60px) rotate(0));
            .propeller .bar{
                @include animation(rotationY 0.4s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.2s linear infinite);
            }
        }
    }
    &.six{
        .helicopter{
            @include transform(translateY(-60px) translateX(-10px));
            .propeller .bar{
                @include animation(rotationY 0.4s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.2s linear infinite);
            }
        }
    }
    &.seven{
        .helicopter{
            @include animation(fly 5s ease-in-out infinite);
            .propeller .bar{
                @include animation(rotationY 0.4s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.2s linear infinite);
            }
        }
    }
    &.eight{
        .helicopter{
            @include animation(none);
            @include transform(translateY(-60px));
            .propeller .bar{
                @include animation(rotationY 0.4s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.2s linear infinite);
            }
        }
    }
    &.nine{
        .helicopter{
            @include transform(translateY(0));
            .propeller .bar{
                @include animation(rotationY 0.4s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.2s linear infinite);
            }
        }
    }
    &.ten{
        .helicopter{
            .propeller .bar{
                @include animation(rotationY 0.8s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 0.6s linear infinite);
            }
            .body{
                @include animation(rotationBody 2s linear);
            }
        }
    }
    &.end{
        .helicopter{
            .propeller .bar{
                @include animation(rotationY 1s linear infinite);
            }
            .spoiler .bar{
                @include animation(rotationZ 1s linear infinite);
            }
        }
    }
    &.over{
        .helicopter{
            .spoiler .bar{
                @include animation(rotationZ 1s linear infinite);
            }
        }
    }
}
```

ok，大功告成。 相应的代码可以到：[这里下载](https://github.com/zhuowenli/Helicopter)

[1]:{{site.qiniu}}/2015/09/06/1.png
[2]:{{site.qiniu}}/2015/09/06/2.png