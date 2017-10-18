/*$(function(){
	//旋转
	// $('#test').transit({rotate:"60deg"})
	/*var v = 10;
	function a(){
		var b = 3;
		function c(){
			var d =4;
			//作用域链从里到外
			alert(b) 
		}
		c();
		alert(d)
		//undefined  因为js没有块级区域 无法读取c()函数里的局部变量
		alert(b)
	}

	a();

	// 闭包
	
	 1、闭包是能够读取其他函数内部变量的函数
	 2、让这些内存的值始终保持在内存中
	 3、可以保护函数内的变量安全
	function a(){
		var i=0;
		function b(){
			i++;
			alert(i);
		}
		console.log(i);
		return b;
	}
	var c=a();  //用c接受b
	 c();		//i为1 
	 c();		//i为2	
})*/

//直接执行把值赋给变量 等于 function s(){};  s();
$(function(){
	var $img = $('.mainbox ul img');
	var num = 0;
	$img.each(function(i){
		var oImg = new Image();
		oImg.onload = function(){
			oImg.onload=null;
			num++;
			$('.loading b').html(parseInt(num/$img.length*100)+"%");
			if(num>i){
				$('.loading').fadeOut()
			}
		}
		oImg.src = $img[i].src;
	})
})



var looPlayerInit = (function(){
	var $lt =null,
		$gt = null,
		$play = null,
		$imglist = null;
	var	imgAll=createImg([['images/ma1.jpg','images/ma2.jpg','images/ma3.jpg','images/ma4.jpg'],
						  ['images/dog1.jpg','images/dog2.jpg','images/dog3.jpg','images/dog4.jpg'],
						  ['images/woman1.jpg','images/woman2.jpg','images/woman3.jpg','images/woman4.jpg']])
	var imgArrIndex = 0;
	var imgAng = 60;
	var origin = ['150px','800px'];
	var timeout=300,
		rotaing=false,
		autotimer = null;
	function init(){
		$lt =$('.lt'),
		$rt = $('.gt'),
		$play = $('.play'),
		$imglist = $('.mainbox ul li');
		configer();
		setEvent();
	}

	function configer(){
		var ang=5;
		var aint=-5;
		$imglist.transform({origin:origin})
		$imglist.each(function(i){
			$(this).transit({rotate:ang*i+aint+"deg"})
		})
	}

	function setEvent(){
		$lt.bind('click',function(){
			anigo(-1);
			return false;
		});
		$rt.bind('click',function(){
			anigo(1);
			return false;
		})
		$play.bind('click',function(){
			var $btn = $(this);
			if($play.text()=='play'){
				autoplay();
				$btn.text('pause')
			}else{
				autostop();
				$btn.text('play')
			}
			return false;
		})
	}
	//把数组里的图片地址转化成图片存到imgArr数组中并且返回给imgAll；
	function createImg(arr){
		var imgArr = [];
		for(var i in arr){
			imgArr[i]=[];
			for(var x in arr[i]){
				imgArr[i][x]=new Image();
				imgArr[i][x].src = arr[i][x];
			}
		}
		return imgArr;
	}

	function anigo(d){
		if(rotaing) return false;
		rotaing = true;
		imgArrIndex += d;
		if(imgArrIndex>imgAll.length-1){
			imgArrIndex = 0;
		}else if(imgArrIndex<0){
			imgArrIndex = imgAll.length-1
		}

		$imglist.each(function(i){
			if(d==1){
			var timeouts = timeout*i;
			}else{
			var	timeouts = timeout*(imgAll.length-i)
			}
			// if(timeouts == timeout*(imgAll.length-1)){
			// 	rotaing = false;
			// }
			var $thisItem = $(this);
			var $thisImg = $thisItem.children('img');
		    var $targetImg = $(imgAll[imgArrIndex][i]);
		    $thisItem.append($targetImg);
		    $targetImg.transform({origin:origin,rotate:(0-d)*imgAng+'deg'});
		    setTimeout(function(){
		    	$thisImg.transform({origin:origin});
		    	$thisImg.transit({rotate:d*imgAng+'deg'});
		    	$targetImg.transit({rotate:0+'deg'},function(){
		    	//删掉原来的图片  回调函数
		    	$thisImg.remove();

		     	if(timeouts == timeout*(imgAll.length)){
				 	rotaing = false;
				// 	console.log(rotaing)
				 }
				 console.log(rotaing)
		    })
		    },timeouts)
		    
		})
	}


	function autoplay(){
		clearInterval(autotimer);
		anigo(1);
		autotimer = setInterval(function(){
			anigo(1);
		},1000)
	}
	function autostop(){
		clearInterval(autotimer)
	}

	return init;
})();

looPlayerInit()


