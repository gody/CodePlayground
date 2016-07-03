(function() {

	// Base template
	var base_tpl =
			"<!doctype html>\n" +
			"<html>\n\t" +
      "<head>\n\t\t" +
      "<meta charset=\"utf-8\">\n\t\t" +
      "<title>Test</title>\n\n\t\t\n\t" +
      "</head>\n\t" +
      "<body>\n\t\n\t" +
      "</body>\n" +
      "</html>";

	var prepareSource = function() {
		var html = html_editor.getValue(),
				css = css_editor.getValue(),
				js = js_editor.getValue(),
				src = '';

		// HTML
		src = base_tpl.replace('</body>', html + '</body>');

		// CSS
		css = '<style>' + css + '</style>';
		src = src.replace('</head>', css + '</head>');

		// Javascript
		js = '<script>' + js + '<\/script>';
		src = src.replace('</body>', js + '</body>');

		return src;
	};

	var render = function() {
		var source = prepareSource();

		var iframe = document.querySelector('#output iframe'),
				iframe_doc = iframe.contentDocument;

		iframe_doc.open();
		iframe_doc.write(source);
		iframe_doc.close();
	};

	// EDITORS

	// CM OPTIONS
	var cm_opt = {
		mode: 'text/html',
		gutter: true,
		lineNumbers: true,
	};

	// HTML EDITOR
	var html_box = document.querySelector('#html textarea');
	var html_editor = CodeMirror.fromTextArea(html_box, cm_opt);


	// CSS EDITOR
	cm_opt.mode = 'css';
	var css_box = document.querySelector('#css textarea');
	var css_editor = CodeMirror.fromTextArea(css_box, cm_opt);


	// JAVASCRIPT EDITOR
	cm_opt.mode = 'javascript';
	var js_box = document.querySelector('#js textarea');
	var js_editor = CodeMirror.fromTextArea(js_box, cm_opt);


	// SETTING CODE EDITORS INITIAL CONTENT
	html_editor.setValue('<p>Hello World</p>');
	css_editor.setValue('body { color: red; }');

	html_editor.on("change",render);
	css_editor.on("change",render);
	js_editor.on("change",render);

	render();
}());