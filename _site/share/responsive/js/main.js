function registerListeners() {
    window.addEventListener('impress:stepwillenter', function(ev) {
        var src = ev.srcElement;
        if( src.classList.contains('overlay') ) {
            var prev = null;
            var steps = document.getElementsByClassName('step'); 
            var length = steps.length; 
            for (var i = 0; i < length; i++) {
                if ( steps[i] === src ) {
                    break;    
                }

                if ( steps[i].classList.contains('slide') ) {
                    prev = steps[i];
                }
            }

            prev.classList.add('overlay-bd');

            console.log("Adding overlay-bd to: " + prev.id);
        } else {
            var overlayBds = document.getElementsByClassName('overlay-bd');
            var length = overlayBds.length;

            for(var i=0;i<length;i++) {
                overlayBds[i].classList.remove('overlay-bd');    
            }
        }
    }); 
}

registerListeners();
