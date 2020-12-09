window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
const {dialog} = require('electron').remote;

var image_url = null;
var image_type = null;
var img_holder = null;
var pixelate_image = null;
var pixelated_canvas = null;
var canvas_context_element = null;

var ready = false;

function validate_path(path)
{
	var test_path = path.toLowerCase();

	if (test_path.endsWith(".png"))
	{
		image_type = "PNG";
	}
	else if (test_path.endsWith(".jpg") || test_path.endsWith(".jpeg"))
	{
		image_type = "JPG";
	}
	else
	{
		path = null;
		image_type = null;

	}

	return path;
}

function get_image_path()
{
	var paths = dialog.showOpenDialog({properties: ['openFile']});
	
	if (paths != null)
	{
		if (paths.length > 0)
		{
			return validate_path(paths[0]);
		}
	}

	alert("Could not get image path");
}




function publish_image()
{
	var image_path = get_image_path();
	var image_imported = document.getElementById('img_imported');
	
	console.log(image_imported.src = image_path)

	
	
	
	// var image = new Image();
	// image.src = image_path;
	
	var pixelate = new Pixelate(image_imported);
	var slider   = document.getElementById('pixelation_amount')
	var output   = document.getElementById('output')

	// var pixelate = new Pixelate(image, {amount: 0.7});

	slider.addEventListener('input', function(event) {
	  var amount = event.currentTarget.value;

	  update(amount);
	});

	function update(amount) {
	  output.textContent = Math.round(amount) + '%';
	  pixelate.setAmount(amount / 100).render();
	}

	window.onresize = function() {
	  pixelate.setWidth(image.parentNode.clientWidth).render();
	};

	update(slider.value)


	document.getElementById('save_button').addEventListener('click',function save_image()
	{
		// var image_path = get_image_path();
		
		var image_imported = document.getElementById('img_imported').src;
		var link = document.getElementById('save_button');
		link.href = image_imported;
		link.download = 'output.jpg';
	});

}

