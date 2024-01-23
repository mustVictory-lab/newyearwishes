// 初始化内容
var wH = window.innerHeight;
var wW = window.innerWidth;
let backgroundRendering = document.getElementById("backgroundRendering");
var generateStars = function generateStars(f) {
    for (var e = 0; e < f; e++) {
        var single = document.createElement("div");
        single.className = e % 20 == 0 ? "spark big-spark" : e % 9 == 0 ? "spark medium-spark" : "star";
        single.setAttribute("style", "top:" + Math.round(Math.random() * wH) + "px;left:" + Math.round(Math.random() * wW) + "px;animation-duration:" + (Math.round(Math.random() * 3000) + 3000) + "ms;animation-delay:" + Math.round(Math.random() * 3000) + "ms;");
        backgroundRendering.appendChild(single);
    }
};
// generateStars(getRandom(140,240));






// 全局变量 提供内容/对象存储
let fireworksCanvas = document.getElementById("fireworks");
let currentFireworks = document.createElement("canvas");
let currentObject = currentFireworks.getContext("2d");
let fireworksObject = fireworksCanvas.getContext("2d");

currentFireworks.width = fireworksCanvas.width = window.innerWidth;
currentFireworks.height = fireworksCanvas.height = window.innerHeight;
let fireworksExplosion = [];
let autoPlayFlag = false;

// 自动加载烟花动画
window.onload = function () {
    drawFireworks();
    lastTime = new Date();
    animationEffect();
    // 背景音乐
    let audio = document.getElementById('bgm');
    
    document.querySelector("body").onclick = function () {
        if (!autoPlayFlag) {
            audio.play();
            autoPlayFlag = true;
            
            setTimeout(() => {
                start();

            }, 6000); 
        }        
    }


    function start() {
            const text = [
                "钟平独家新年祝福🧧：",
                "˗ˋˏ𝟐𝟎𝟐𝟑ˎˊ˗农历新年即将到来💥💥💥",
                "️祝愿大家除夕快乐、新年快乐、皆得所愿！🧨🏮🧧▹ 𝑯𝒂𝒑𝒑𝒚 𝑵𝒆𝒘 𝒀𝒆𝒂𝒓",
                "祝愿大家岁岁长喜樂，萬事皆勝意，顺顺当当，幸福⁺⁹⁹⁹⁹安康！ᑋᵉᑊᑊᵒ ᵕ̈  ॱଳॱ ²⁰²³",
                "祝愿大家烟火向星辰，所愿皆成真，日子新如光，欣喜与若狂！շօշ3 ʜᴀ͟ᴘ͟ᴘ͟ʏᴇᴠᴇʀʏᴅᴀʏ ",
                "Happy New Year's Even and Happy Chinese New Year!🎆🎆🎆",//🎆
                "𝐀𝐥𝐥 𝐭𝐡𝐞 𝐛𝐞𝐬𝐭 𝟐𝟎𝟐𝟑🧧"
            ]
            let str = text.join('<br><br>')
            let str_ = ''
            let i = 0
            let content = document.getElementById('contents')
            let timer = setInterval(() => {
                if (str_.length < str.length) {
                    str_ += str[i++]
                    content.innerHTML = '<p>' + str_ + '<span class="xx" style="opacity: 1;    color: red;">✍</span></p>'  //❤                //打印时加光标
                } else {
                    clearInterval(timer)
                    content.innerHTML = '<p>' + str_ + '</p>'
                }
            }, 100)
        }


    // $('#yhBtn').click(e => {
    //         $('#yhBtn').hide()
    //         setTimeout(() => {
    //             start()

    //         }, 5000); 
    //     })



    for (let i = 0; i <= 10; i++){
        setTimeout(function () {
            document.querySelector("body > div.message").style.opacity = i/10;
        },i*60+2000)
    };
    for (let i = 0; i <= 10; i++){
        setTimeout(function () {
            document.querySelector("body > div.message").style.opacity = 1 - i/10;
            if(i==10){
                document.querySelector("body > div.message > p").innerHTML = "点击屏幕可快速释放烟花"
            }
        },i*60+8000)
    };
        for (let i = 0; i <= 10; i++){
        setTimeout(function () {
            document.querySelector("body > div.message").style.opacity = i/10;
        },i*60+8600)
    };
    for (let i = 0; i <= 10; i++){
        setTimeout(function () {
            document.querySelector("body > div.message").style.opacity = 1 - i/10;
        },i*60+16600)
    };
};

let lastTime;


// 烟花动画效果
function animationEffect() {
    fireworksObject.save();
    fireworksObject.fillStyle = "rgba(0,0,0,0.1)";
    fireworksObject.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworksObject.restore();
    let newTime = new Date();
    if (newTime - lastTime > getRandom(10,1600) + (window.innerHeight - 767) / 2) {
        let random = Math.random() * 100 > 15;
        let x = getRandom(0, (fireworksCanvas.width));
        let y = getRandom(0,400);
        if (random) {
            let bigExplode = new explode(
                getRandom(0, fireworksCanvas.width),
                getRandom(1, 3),
                "#FFF",
                {
                    x: x,
                    y: y,
                }
            );
            fireworksExplosion.push(bigExplode);

        } else {
            let x = getRandom(fireworksCanvas.width/2-300, fireworksCanvas.width/2+300);
            let y = getRandom(0, 350);
            let bigExplode = new explode(
                getRandom(0, fireworksCanvas.width),
                getRandom(1, 3),
                "#FFF",
                {
                    x: x,
                    y: y,
                },
                document.querySelectorAll(".shape")[
                    parseInt(getRandom(0, document.querySelectorAll(".shape").length))
                    ]
            );
            fireworksExplosion.push(bigExplode);
        }
        lastTime = newTime;
    }
    sparks.foreach(function () {
        this.paint();
    });
    fireworksExplosion.foreach(function () {
        let that = this;
        if (!this.dead) {
            this._move();
            this._drawLight();
        } else {
            this.explodes.foreach(function (index) {
                if (!this.dead) {
                    this.moveTo();
                } else {
                    if (index === that.explodes.length - 1) {
                        fireworksExplosion[fireworksExplosion.indexOf(that)] = null;
                    }
                }
            });
        }
    });
    setTimeout(animationEffect, 16);
}

Array.prototype.foreach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] !== null) {
            callback.apply(this[i], [i]);
        }
    }
};

fireworksCanvas.onclick = function (evt) {
    let x = evt.clientX;
    let y = evt.clientY;
    let explode1 = new explode(
        getRandom(fireworksCanvas.width / 3, (fireworksCanvas.width * 2) / 3),
        2,
        "#FFF",
        {
            x: x,
            y: y,
        }
    );
    fireworksExplosion.push(explode1);
};

let explode = function (x, r, c, explodeArea, shape) {
    this.explodes = [];
    this.x = x;
    this.y = fireworksCanvas.height + r;
    this.r = r;
    this.c = c;
    this.shape = shape || false;
    this.explodeArea = explodeArea;
    this.dead = false;
    this.ba = parseInt(getRandom(80, 200));
};
explode.prototype = {
    _paint: function () {
        fireworksObject.save();
        fireworksObject.beginPath();
        fireworksObject.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        fireworksObject.fillStyle = this.c;
        fireworksObject.fill();
        fireworksObject.restore();
    },
    _move: function () {
        let dx = this.explodeArea.x - this.x,
            dy = this.explodeArea.y - this.y;
        // this.x = this.x + dx * 0.01;
        this.x = this.x + dx * 0;
        this.y = this.y + dy * 0.01;
        // if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
        if (this.ba && Math.abs(dy) <= this.ba) {
            if (this.shape) {
                this._shapeExplode();
            } else {
                this._explode();
            }
            this.dead = true;
        } else {
            this._paint();
        }
    },
    _drawLight: function () {
        fireworksObject.save();
        fireworksObject.fillStyle = "rgba(255,228,150,0.3)";
        fireworksObject.beginPath();
        fireworksObject.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
        fireworksObject.fill();
        fireworksObject.restore();
    },
    _explode: function () {
        let embellishmentNum = getRandom(30, 200);
        let style = getRandom(0, 10) >= 5 ? 1 : 2;
        let color;
        if (style === 1) {
            color = {
                a: parseInt(getRandom(128, 255)),
                b: parseInt(getRandom(128, 255)),
                c: parseInt(getRandom(128, 255)),
            };
        }
        let fullRange = parseInt(getRandom(300, 400));
        for (let i = 0; i < embellishmentNum; i++) {
            if (style === 2) {
                color = {
                    a: parseInt(getRandom(128, 255)),
                    b: parseInt(getRandom(128, 255)),
                    c: parseInt(getRandom(128, 255)),
                };
            }
            let a = getRandom(-Math.PI, Math.PI);
            let x = getRandom(0, fullRange) * Math.cos(a) + this.x;
            let y = getRandom(0, fullRange) * Math.sin(a) + this.y;
            let radius = getRandom(0, 2);
            let embellishment = new newEmbellishment(this.x, this.y, radius, color, x, y);
            this.explodes.push(embellishment);
        }
    },
    _shapeExplode: function () {
        let that = this;
        putValue(currentFireworks, currentObject, this.shape, 5, function (dots) {
            let dx = fireworksCanvas.width / 2 - that.x;
            let dy = fireworksCanvas.height / 2 - that.y;
            let color;
            for (let i = 0; i < dots.length; i++) {
                color = {
                    a: dots[i].a,
                    b: dots[i].b,
                    c: dots[i].c,
                };
                let x = dots[i].x;
                let y = dots[i].y;
                let radius = 1;
                let embellishment = new newEmbellishment(that.x, that.y, radius, color, x - dx, y - dy);
                that.explodes.push(embellishment);
            }
        });
    },
};

function putValue(fireworks, context, ele, dr, callback) {
    context.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    let img = new Image();
    let dots;
    if (ele.innerHTML.indexOf("img") >= 0) {
        img.src = ele.getElementsByTagName("img")[0].src;
        implode(img, function () {
            context.drawImage(
                img,
                fireworksCanvas.width / 2 - img.width / 2,
                fireworksCanvas.height / 2 - img.width / 2
            );
            let dots = gettingData(fireworks, context, dr);
            callback(dots);
        });
    } else {
        let text = ele.innerHTML;
        context.save();
        let fontSize = getRandom(3,11);
        context.font = fontSize + "vw 宋体 bold";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle =
            "rgba(" +
            parseInt(getRandom(128, 255)) +
            "," +
            parseInt(getRandom(128, 255)) +
            "," +
            parseInt(getRandom(128, 255)) +
            " , 1)";
        context.fillText(text, fireworksCanvas.width / 2, fireworksCanvas.height / 2);
        context.restore();
        dots = gettingData(fireworks, context, dr);
        callback(dots);
    }
}

function implode(img, callback) {
    if (img.complete) {
        callback.call(img);
    } else {
        img.onload = function () {
            callback.call(this);
        };
    }
}

function gettingData(fireworks, context, dr) {
    let imgData = context.getImageData(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    context.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    let dots = [];
    for (let x = 0; x < imgData.width; x += dr) {
        for (let y = 0; y < imgData.height; y += dr) {
            let i = (y * imgData.width + x) * 4;
            if (imgData.data[i + 3] > 128) {
                let dot = {
                    x: x,
                    y: y,
                    a: imgData.data[i],
                    b: imgData.data[i + 1],
                    c: imgData.data[i + 2],
                };
                dots.push(dot);
            }
        }
    }
    return dots;
}

function getRandom(a, b) {
    return Math.random() * (b - a) + a;
}

let maxRadius = 1,
    sparks = [];

function drawFireworks() {
    for (let i = 0; i < 100; i++) {
        let spark = new newSpark();
        sparks.push(spark);
        spark.paint();
    }
}

// 新建星火位置
let newSpark = function () {
    this.x = Math.random() * fireworksCanvas.width;

    this.y = Math.random() * 2 * fireworksCanvas.height - fireworksCanvas.height;

    this.r = Math.random() * maxRadius;
};

newSpark.prototype = {
    paint: function () {
        fireworksObject.save();
        fireworksObject.beginPath();
        fireworksObject.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        fireworksObject.fillStyle = "rgba(255,255,255," + this.r + ")";
        fireworksObject.fill();
        fireworksObject.restore();
    },
};
// 烟花点缀生成
let newEmbellishment = function (centerX, centerY, radius, color, tx, ty) {
    this.tx = tx;
    this.ty = ty;
    this.x = centerX;
    this.y = centerY;
    this.dead = false;
    this.radius = radius;
    this.color = color;
};
newEmbellishment.prototype = {
    paint: function () {
        fireworksObject.save();
        fireworksObject.beginPath();
        fireworksObject.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        fireworksObject.fillStyle =
            "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + ",1)";
        fireworksObject.fill();
        fireworksObject.restore();
    },
    moveTo: function () {
        this.ty = this.ty + 0.3;
        let dx = this.tx - this.x,
            dy = this.ty - this.y;
        this.x = Math.abs(dx) < 0.1 ? this.tx : this.x + dx * 0.1;
        this.y = Math.abs(dy) < 0.1 ? this.ty : this.y + dy * 0.1;
        if (dx === 0 && Math.abs(dy) <= 80) {
            this.dead = true;
        }
        this.paint();
    },
};
