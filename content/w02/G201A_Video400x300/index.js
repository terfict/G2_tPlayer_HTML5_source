var url = location.search.substring(1);

PDFJS.cMapUrl = 'https://unpkg.com/pdfjs-dist@1.9.426/cmaps/';
PDFJS.cMapPacked = true;

var pdfDoc = null;

function createPage() {
    var div = document.createElement("canvas");
    document.body.appendChild(div);
    return div;
}

function renderPage(num) {
    pdfDoc.getPage(num).then(function (page) {
        var viewport = page.getViewport(2.0);
        var canvas = createPage();
        var ctx = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
}

PDFJS.getDocument(test.pdf).then(function (pdf) {
    pdfDoc = pdf;
    for (var i = 1; i <= pdfDoc.numPages; i++) {
        renderPage(i)
    }
});

// 作者：Wang_Yi
// 链接：https://www.jianshu.com/p/fec41669acbb
// 來源：简书
// 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。