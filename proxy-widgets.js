window.addEventListener('load', function(event) { 
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