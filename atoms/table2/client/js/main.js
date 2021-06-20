var el = document.createElement('script');
el.src = '<%= atomPath %>/app.js';
document.body.appendChild(el);



setTimeout(() => {
  if (window.resize) {  
    const html = document.querySelector('html')
    const body = document.querySelector('body')
  
    html.style.overflow = 'hidden'
    html.style.margin = '0px'
    html.style.padding = '0px'
  
    body.style.overflow = 'hidden'
    body.style.margin = '0px'
    body.style.padding = '0px'
  
  window.resize()
  }
},100)

function onElementHeightChange(elm, callback) {
    var lastHeight = elm.clientHeight, newHeight;
    (function run(){
        newHeight = elm.clientHeight;
        if( lastHeight != newHeight )
            callback();
        lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer )
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 250);
    })();
}

if (window.frameElement) {

    // console.log("We are inside an iframe universe.")
    // document.querySelector(".interactive-wrapper").style.overflow = "hidden";
    // document.querySelector(".interactive-wrapper").style.borderTop = "solid 1px #dfdfdf";
    // document.querySelector(".interactive-wrapper").style.borderBottom = "solid 1px #dfdfdf";
    // document.querySelector(".interactive-wrapper").style.paddingTop = "2px";
    // document.querySelector("#controls").style.maxWidth = "none";

    onElementHeightChange(document.body, function() {
        window.frameElement.height = document.body.offsetHeight + 150
    });

}