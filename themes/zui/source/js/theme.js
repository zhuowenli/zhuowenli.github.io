(function () {
    "use strict";

    const Theme = {};

    Theme.backToTop = {
        register: function () {
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
            const { icon, hide_text, show_text } = themeConfig.favicon;
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

    this.Theme = Theme;
}.call(this));