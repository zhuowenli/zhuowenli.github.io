(function () {
    "use strict";

    const Theme = {};

    Theme.backToTop = {
        register() {
            const $backToTop = $('#back-to-top');

            $(window).scroll(function () {
                if ($(window).scrollTop() > 100) {
                    $backToTop.fadeIn(1000);
                } else {
                    $backToTop.fadeOut(1000);
                }
            });

            $backToTop.click(function () {
                $('body,html').animate({
                    scrollTop: 0
                });
            });
        }
    };

    Theme.favicon = {
        // https://github.com/greatsuspender/thegreatsuspender/blob/9730c09986dee2d0c265a8599ff4d6d573b2d1d6/src/js/gsFavicon.js#L325
        buildFaviconMetaData(url) {
            const timeout = 5 * 1000;
            return new Promise((resolve, reject) => {
                const img = new Image();
                // 12-16-2018 ::: @CollinChaffin ::: Anonymous declaration required to prevent terminating cross origin security errors
                // 12-16-2018 ::: @CollinChaffin ::: http://bit.ly/2BolEqx
                // 12-16-2018 ::: @CollinChaffin ::: https://bugs.chromium.org/p/chromium/issues/detail?id=409090#c23
                // 12-16-2018 ::: @CollinChaffin ::: https://bugs.chromium.org/p/chromium/issues/detail?id=718352#c10
                img.crossOrigin = 'Anonymous';
                let imageLoaded = false;

                img.onload = () => {
                    imageLoaded = true;

                    let canvas;
                    let context;
                    canvas = window.document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context = canvas.getContext('2d');
                    context.drawImage(img, 0, 0);

                    let imageData;
                    try {
                        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    } catch (e) {
                        reject(e);
                        return;
                    }

                    const origDataArray = imageData.data;
                    const normalisedDataArray = new Uint8ClampedArray(origDataArray);
                    const transparentDataArray = new Uint8ClampedArray(origDataArray);

                    let r, g, b, a;
                    let fuzzy = 0.1;
                    let light = 0;
                    let dark = 0;
                    let maxAlpha = 0;
                    let maxRgb = 0;

                    for (let x = 0; x < origDataArray.length; x += 4) {
                        r = origDataArray[x];
                        g = origDataArray[x + 1];
                        b = origDataArray[x + 2];
                        a = origDataArray[x + 3];

                        let localMaxRgb = Math.max(Math.max(r, g), b);
                        if (localMaxRgb < 128 || a < 128) dark++;
                        else light++;
                        maxAlpha = Math.max(a, maxAlpha);
                        maxRgb = Math.max(localMaxRgb, maxRgb);
                    }

                    //saftey check to make sure image is not completely transparent
                    if (maxAlpha === 0) {
                        reject(
                            'Aborting favicon generation as image is completely transparent. url: ' +
                            url
                        );
                        return;
                    }

                    const darkLightDiff = (light - dark) / (canvas.width * canvas.height);
                    const isDark = darkLightDiff + fuzzy < 0;
                    const normaliserMultiple = 1 / (maxAlpha / 255);

                    for (let x = 0; x < origDataArray.length; x += 4) {
                        a = origDataArray[x + 3];
                        normalisedDataArray[x + 3] = parseInt(a * normaliserMultiple, 10);
                    }
                    for (let x = 0; x < normalisedDataArray.length; x += 4) {
                        a = normalisedDataArray[x + 3];
                        transparentDataArray[x + 3] = parseInt(a * 0.5, 10);
                    }

                    imageData.data.set(normalisedDataArray);
                    context.putImageData(imageData, 0, 0);
                    const normalisedDataUrl = canvas.toDataURL('image/png');

                    imageData.data.set(transparentDataArray);
                    context.putImageData(imageData, 0, 0);
                    const transparentDataUrl = canvas.toDataURL('image/png');

                    const faviconMetaData = {
                        favIconUrl: url,
                        isDark,
                        normalisedDataUrl,
                        transparentDataUrl,
                    };
                    resolve(faviconMetaData);
                };
                img.src = url;
                setTimeout(() => {
                    if (!imageLoaded) {
                        reject('Failed to load img.src of: ' + url);
                    }
                }, timeout);
            });
        },

        register() {
            const originTitle = document.title;
            const {
                icon,
                hide_text,
                show_text
            } = themeConfig.favicon;
            let normalisedFingerprint = icon;
            let transparentFingerprint = icon;
            let titleTimer;

            this.buildFaviconMetaData(icon).then(faviconMeta => {
                normalisedFingerprint = faviconMeta.normalisedDataUrl;
                transparentFingerprint = faviconMeta.transparentDataUrl;
            }).catch(console.log)

            document.addEventListener('visibilitychange', function () {
                if (document.hidden) {
                    $('[rel="shortcut icon"]').attr('href', transparentFingerprint);
                    document.title = hide_text;
                    clearTimeout(titleTimer);
                } else {
                    $('[rel="shortcut icon"]').attr('href', normalisedFingerprint);
                    document.title = show_text + originTitle;
                    titleTimer = setTimeout(function () {
                        document.title = originTitle;
                    }, 2000);
                }
            });
        }
    }

    const screenSize = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    const anchors = [
        [$("#js-mainTriangleTop"), 0, 0, 180, 0, -0.6, 0, 0.9, 0.9, 0.9],
        [$("#js-mainTriangleRight"), 0, 0, 250, 1.4, 0, 0, 0.9, 0.9, 0.9],
        [$("#js-mainTriangleBottom"), 0, -10, 10, 0.2, 0.6, 0, 0.9, 0.9, 0.9],
        [$("#js-mainTriangleLeft"), 0, 0, 80, -1.8, 0.2, 0, 0.9, 0.9, 0.9],
        [$("#js-backgroundTriangleTop"), 20, 0, 180, 1.4, -0.8, -0.6, 0.3, 0.6, 0.6],
        [$("#js-backgroundTriangleRight"), 0, 0, 250, 1.2, -0.6, -0.6, 0.7, 0.6, 0.7],
        [$("#js-backgroundTriangleBottom"), 0, -10, 10, -6, -1.2, -0.6, 0.3, 0.6, 0.6],
        [$("#js-backgroundTriangleLeft"), 0, 0, 80, -4, 1.8, -0.6, 0.3, 0.4, 0.4],
    ];
    Theme.cursor = {
        isActive: false,
        isHeroActive: true,
        mainTrianglesBox: $("#js-mainTrianglesBox"),
        backgroundTrianglesBox: $("#js-backgroundTrianglesBox"),
        triangleTop: $("#js-mainTriangleTop .triangle"),
        triangleRight: $("#js-mainTriangleRight .triangle"),
        triangleBottom: $("#js-mainTriangleBottom .triangle"),
        triangleLeft: $("#js-mainTriangleLeft .triangle"),
        triangleBackgroundTop: $("#js-backgroundTriangleTop .triangle"),
        triangleBackgroundRight: $("#js-backgroundTriangleRight .triangle"),
        triangleBackgroundBottom: $("#js-backgroundTriangleBottom .triangle"),
        triangleBackgroundLeft: $("#js-backgroundTriangleLeft .triangle"),
        lastX: screenSize.width / 2,
        lastY: screenSize.height / 2,
        clientX: screenSize.width / 2,
        clientY: screenSize.height / 2,
        init() {
            document.addEventListener("mousemove", this.handleMouseMove.bind(this));
            document.addEventListener("scroll", this.handleScroll.bind(this));
            this.lastX = screenSize.width / 2;
            this.lastY = screenSize.height / 2;
            this.clientX = screenSize.width / 2;
            this.clientY = screenSize.height / 2;
            this.isActive = true;
            this.update();
            this.updateAnchor(window.scrollY);
            $('.scene-3d').addClass('fullScreenScene');
        },
        deinit() {
            document.removeEventListener("mousemove", this.handleMouseMove.bind(this));
            document.removeEventListener("scroll", this.handleScroll.bind(this));
            this.isActive = false;
        },
        handleMouseMove(e) {
            this.clientX = e.clientX;
            this.clientY = e.clientY;
        },
        handleScroll() {
            this.clientX = screenSize.width / 2;
            this.clientY = screenSize.height / 2;

            if (window.scrollY > screenSize.height * 2) {
                this.isHeroActive = false;
            } else {
                this.updateAnchor(window.scrollY);
                if (!this.isHeroActive) {
                    this.isHeroActive = true;
                    this.update();
                }
            }
        },
        update() {
            if (this.isActive) {
                requestAnimationFrame(this.update.bind(this));

                let e = this.lastX + .02 * (this.clientX - this.lastX);
                let t = this.lastY + .02 * (this.clientY - this.lastY);
                let n = e / screenSize.width - .5;
                let o = t / screenSize.height - .5;

                if (this.isHeroActive) {
                    this.mainTrianglesBox.css('transform', `translateY(${20 * o}vw) translateX(${20 * n}vw)`);
                    this.triangleTop.css('transform', `rotateX(${120 * o}deg) rotateY(${120 * n}deg)`);
                    this.triangleRight.css('transform', `rotateY(${120 * o}deg) rotateX(${120 * n}deg)`);
                    this.triangleBottom.css('transform', `rotateX(${120 * o}deg) rotateY(${120 * n}deg)`);
                    this.triangleLeft.css('transform', `rotateY(${120 * o}deg) rotateX(${120 * n}deg)`);
                    this.backgroundTrianglesBox.css('transform', `translateY(${12 * o}vw) translateX(${12 * n}vw)`);
                    this.triangleBackgroundTop.css('transform', `rotateX(${-120 * o}deg) rotateY(${-120 * n}deg)`);
                    this.triangleBackgroundRight.css('transform', `rotateY(${-120 * o}deg) rotateX(${-120 * n}deg)`);
                    this.triangleBackgroundBottom.css('transform', `rotateX(${-120 * o}deg) rotateY(${-120 * n}deg)`);
                    this.triangleBackgroundLeft.css('transform', `rotateY(${-120 * o}deg) rotateX(${-120 * n}deg)`);
                }

                this.lastX = e;
                this.lastY = t;
            }
        },
        updateAnchor(scrollY) {
            const calculateCurrentValue = (t) => t + t * (scrollY / (screenSize.width < 640 ? 300 : 500));

            anchors.forEach(anchor => {
                const element = anchor[0];
                const rx = calculateCurrentValue(anchor[1], scrollY);
                const ry = calculateCurrentValue(anchor[2], scrollY);
                const rz = calculateCurrentValue(anchor[3], scrollY);
                const tx = calculateCurrentValue(anchor[4], scrollY);
                const ty = calculateCurrentValue(anchor[5], scrollY);
                const tz = calculateCurrentValue(anchor[6], scrollY);
                const sx = calculateCurrentValue(anchor[7], scrollY);
                const sy = calculateCurrentValue(anchor[8], scrollY);
                const sz = calculateCurrentValue(anchor[9], scrollY);

                element.css('transform', `scale3d(${sx}, ${sy}, ${sz}) translate3d(${25 * tx}vw, ${25 * ty}vw, ${25 * tz}vw) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`);
            });
        }
    }

    this.Theme = Theme;
}.call(this));