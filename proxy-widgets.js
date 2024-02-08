window.addEventListener('load', function(event) { 
	document.querySelector('#url_comparer button').addEventListener('click', function(evt) {
		let url1 = document.getElementById('url_compare1_input').value.trim();
		url1 = new URL(url1.trim());
		let url2 = document.getElementById('url_compare2_input').value.trim();
		url2 = new URL(url2.trim());
		let out = document.getElementById('url_compare_output');
		
		let html = '<div style="display:inline-block"><table><caption>URL 1 Components</caption>';
		html = html + '<tr><th>Protocol:</th><td>' + url1.protocol + '</td></tr>';
		html = html + '<tr><th>Hostname:</th><td>' + url1.hostname + '</td></tr>';
		html = html + '<tr><th>Pathname:</th><td>' + url1.pathname + '</td></tr>';
		html = html + '</table>';

		if(url1.search.length > 0) {
			html = html + '<table><caption>URL1 Query Parameters</caption>';
			url1.searchParams.sort();
			for([k,v] of url1.searchParams) 
				html = html + '<tr><th>' + k +':</th><td>' + v + '</td></tr>';
			html = html + '</table>';
		}
		html = html + '</div>';
		
		html = html + '<div style="display:inline-block; margin-left:1em; margin-bottom:.5em"><table><caption>URL 2 Components</caption>';
		html = html + '<tr><th>Protocol:</th><td>' + url2.protocol + '</td></tr>';
		html = html + '<tr><th>Hostname:</th><td>' + url2.hostname + '</td></tr>';
		html = html + '<tr><th>Pathname:</th><td>' + url2.pathname + '</td></tr>';
		html = html + '</table>';

		if(url2.search.length > 0) {
			html = html + '<table><caption>URL2 Query Parameters</caption>';
			url2.searchParams.sort();
			for([k,v] of url2.searchParams) 
				html = html + '<tr><th>' + k +':</th><td>' + v + '</td></tr>';
			html = html + '</table>';
		}
		html = html + '</div>';
		
		document.getElementById('url_compare_output').innerHTML = html;
		
		document.getElementById('url_comparer').scrollIntoView();
	});

	document.querySelector('#url_parser button').addEventListener('click', function(evt) {
		let url = document.getElementById('url_parser_input').value.trim();
		url = new URL(url.trim());
		let out = document.getElementById('url_parser_output');
		let html = '<div style="display:inline-block; margin-bottom:.5em"><table><caption>URL Components</caption>';
		html = html + '<tr><th>Protocol:</th><td>' + url.protocol + '</td></tr>';
		html = html + '<tr><th>Hostname:</th><td>' + url.hostname + '</td></tr>';
		html = html + '<tr><th>Pathname:</th><td>' + url.pathname + '</td></tr>';
		html = html + '</table>';

		if(url.search.length > 0) {
			html = html + '<table><caption>Query Parameters</caption>';
			url.searchParams.sort();
			for([k,v] of url.searchParams) 
				html = html + '<tr><th>' + k +':</th><td>' + v + '</td></tr>';
			html = html + '</table>';
		}
		html = html + '</div>';
		out.innerHTML = html;
		document.getElementById('url_parser').scrollIntoView();
	});
	
	document.querySelector('#clinicalkey_converter button').addEventListener('click', function(evt) {
		let url = document.getElementById('ck_input').value.trim();
		url = url.replace('http:','https:');
		
		if(!url.startsWith('https://www.clinicalkey.com/')) {
			document.getElementById('ck_output').value = 'Not a ClinicalKey URL';
			document.getElementById('ck_proxy').value = '';
		}
		else if(url.includes('/#!/')) {
			document.getElementById('ck_output').value = encodeURIComponent(url);
			document.getElementById('ck_proxy').value = 'NO';
		}
		else {
			document.getElementById('ck_output').value = url
			document.getElementById('ck_proxy').value = 'YES';
		}
	});

	document.querySelector('#voyager_declutter button').addEventListener('click', function(evt) {
		let url = document.getElementById('voy_dc_input').value;
		let output = document.getElementById('voy_dc_output');
		let prefix = 'https://widgets.ebscohost.com/prod/customlink/proxify/proxify.php?count=1&encode=1&proxy=https%3A%2F%2Fgo.openathens.net%2Fredirector%2Fpcom.edu%3Furl%3D&target=';

		if(url.startsWith(prefix)) {
			output.value = url.replace(prefix,'');
		}
		else {
			output.value = url;
		}
		
		output.focus();
		output.select();
	});

	document.querySelector('#lww_converter button').addEventListener('click', function(evt) {
		let url = document.getElementById('lww_input').value;
		let output = document.getElementById('lww_output');
		let lww_re1 = /http[s]{0,1}:\/\/([a-z0-9]+)-lwwhealthlibrary-com\.eu1\.proxy\.openathens\.net\/book\.aspx\?bookid=([0-9]+)/;
		
		let lww_re2 = /http[s]{0,1}:\/\/([a-z0-9]+).lwwhealthlibrary\.com\/book.aspx\?bookid=([0-9]+)/;

		let match1 = url.match(lww_re1);
		let match2 = url.match(lww_re2);
		
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
	
	document.querySelector('#voy_converter button').addEventListener('click', function(evt) {
		let url = document.getElementById('voy_input').value;
		let output = document.getElementById('voy_output');
		let voy_re1 = /bibId=([0-9]+)/;

		let match = url.match(voy_re1);
		
		if(match != null) {
			output.value = 'http://pcom.hosted.exlibrisgroup.com/vwebv/holdingsInfo?bibId=' + match[1];
			output.focus();
			output.select();
		}
		else {
			output.value = 'bibID Not Found';
			output.focus();
			output.select();
		}

	});
	
		document.querySelector('#ebsco_converter button').addEventListener('click', function(evt) {
		let url = document.getElementById('ebsco_input').value;
		let output = document.getElementById('ebsco_output');
		
		let params = new URLSearchParams(url);
		let auth = (params.get('AuthType') == 'sso');
		let client = (params.get('custid') == 's6636215');
		
		if(!auth && !client) {
			output.value = 'Might need proxy. Missing both AuthType and custID.';
		}
		else if(!auth) {
			output.value = 'Might need proxy. Missing AuthType.';
		}
		else if(!client) {
			output.value = 'Might need proxy. Missing custID.';
		}
		else {
			output.value = 'Valid. Does not need proxy.';
		}
		output.focus();
	});
});