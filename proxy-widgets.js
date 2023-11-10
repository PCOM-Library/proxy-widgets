window.addEventListener('load', function(event) { 
	document.querySelector('#lww_converter button').addEventListener('click', function(evt) {
		let url = document.getElementById('lww_input').value;
		let output = document.getElementById('lww_output');
		let lww_re1 = /http[s]{0,1}:\/\/([a-z0-9]+)-lwwhealthlibrary-com\.eu1\.proxy\.openathens\.net\/book\.aspx\?bookid=([0-9]+)/;
		
		let lww_re2 = /http[s]{0,1}:\/\/([a-z0-9]+).lwwhealthlibrary\.com\/book.aspx\?bookid=([0-9]+)/;

		match1 = url.match(lww_re1);
		match2 = url.match(lww_re2);
		
		if(match1 != null) {
			output.value = 'https://' + match1[1] + '.lwwhealthlibrary.com/book.aspx?bookid=' + match1[2];
		}
		else if(match2 != null) {
			output.value = url.replace('http:','https:');
		}
		else {
			output.value = 'Not an LWW Health Library URL';
		}
		output.focus();
		output.select();
	});
});