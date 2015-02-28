jQuery(document).ready(function($){

	$(".entry-content a").each(function(){
		$(this).click(function(e){
			e.preventDefault();

			var dialog = $("<div id='imgDialog' title='Image'><div class='imgexif-content'><div class='imgexif-title'></div><div class='imgexif-image'></div><div class='imgexif-footer'></div></div><div class='imgexif-info'></div></div>").appendTo("body");

			dialog.find(".imgexif-image").append("<img src='" + $(this).attr("href") + "' />");

			dialog.show();
			$("html").css("overflow","hidden");

			//TODO image height
			var imgHeight = $(window).height()-100;
			dialog.find(".imgexif-image img").css("height",imgHeight);

			//exif information
			//var exifs =$.parseJSON($(this).find("img").attr("rel"));

			var imgUrl = $(this).attr("href");

			$.post(ajax_object.ajax_url,
				{
					_ajax_nonce:ajax_object.author,
					action:"exif",
					url:imgUrl,
				},
				function(data){
					var json_data = $.parseJSON(data);
					dialog.find(".imgexif-info")
						.append("<div><span class='exif-desc'>Camera maker</span><span class='exif-value'>"+ json_data.Make +"</span></div>")
						.append("<div><span class='exif-desc'>Camera model</span><span class='exif-value'>"+ json_data.Model +"</span></div>")
						.append("<div><span class='exif-desc'>Exposure time</span><span class='exif-value'>"+ json_data.ExposureTime +"</span></div>")
						.append("<div><span class='exif-desc'>F-stop</span><span class='exif-value'>"+ json_data.FNumber +"</span></div>")
						.append("<div><span class='exif-desc'>ISO speed</span><span class='exif-value'>"+ json_data.ISOSpeedRatings +"</span></div>")
						.append("<div><span class='exif-desc'>Focal length</span><span class='exif-value'>"+ json_data.FocalLength +"</span></div>")
					;
				}
			);
		});
	});

});