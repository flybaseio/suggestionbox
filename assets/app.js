var suggestionsApp = function(){
	this.url = document.location.pathname;
	return this;
}

suggestionsApp.prototype.start = function(){
	var api_key = "YOUR-FLYBASE-API-KEY";
	var app_name = "suggestionbox";
	
	this.flybaseRef = new Flybase(api_key, app_name, "suggestions");
	return this;
};

suggestionsApp.prototype.view = function( table_name ){
	var self = this;
	var table_name = "#" + table_name;
	var table_headers = [];
	var table_data = [];
	var first = true;
	self.flybaseRef.on('value').then( function( data ){
		$(table_name).find("tbody").html("");
		data.forEach( function( row ){
			var btr = $('<tr>');
			var row = row.value();
			var meta = row['_meta'];
			if( first ){
				var htr = $('<tr>');
				for( var key in meta ){
					var val = meta[key];
					$('<th>' + val + '</th>').appendTo( htr );				
				}
				$(table_name).find("thead").html("").append( htr );
			}
			first = false;
			table_data.push( row );
			for( var i in meta ){
				var key = meta[i];
				var val = row[key];
				if( val === '' ){
					val = '---';
				}
				$('<td>' + val.linkify() + '</td>').appendTo( btr );
			}
			$(table_name).find("tbody").append( btr );
		});
		console.log( "done " );
	});
	return this;
};

//	save the form into your flybase app.
suggestionsApp.prototype.save = function( form_name ){
	var self = this;
	var form_name = "#" + form_name;
	$( form_name ).submit(function( event ) {
		$("#flash").hide();
		$("#revflash").hide();
		var record = {};
		var meta = {};
		$(this).find(':input').each(function(){
			var field_id = $(this).attr('id');
			var label = $(this).data('label');
			var order = $(this).data('order');
			var value = $(this).val();
			if( typeof label !== 'undefined' ){
				meta[order] = label;
				record[label] = value;
			}
			$(this).val("");
		});

		record['_meta'] = meta;
		self.flybaseRef.push( record ).then( function(){
			$("#flash").html("<p>Your message has been saved</p>").show();
			window.location.href = "suggestions.html";
		});
		event.preventDefault();
	});	
	return this;
};

if(!String.linkify) {
	String.prototype.linkify = function() {
		// http://, https://, ftp://
		var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
		
		// www. sans http:// or https://
		var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		
		// Email addresses
		var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

		
		return this
			.replace(urlPattern, '<a href="$&" target="_new">$&</a>')
			.replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
			.replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
	};
}
