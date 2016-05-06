//轮播图
$(function(){
	var highlight=$('.highlight');
	for(var i=0;i<highlight.length;i++){
		highlight[i].style.color="#d01f47";
	}

	var imgs=$(".imgs1");
	var btn=$(".btn");
	var conbox=$(".menu-conbox")[0];
	var bannerarr=["#bd18fb","#dfdfdf","#fff701","#dfdfdf","#67cba7"];
	var num=1;
	function move(){
		if(num==5){
			num=0;
		}
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.zIndex=2;
			btn[i].style.background="#000";
		}
		imgs[num].style.zIndex=3;
		btn[num].style.background="#c40000";
		conbox.style.backgroundColor=bannerarr[num];
		num++;
	}
	var time=setInterval(move,2000);
	for(var i=0;i<btn.length;i++){
		btn[i].index=i;
		btn[i].onmouseover=function(){
			clearInterval(time);
			for(var j=0;j<imgs.length;j++){
				imgs[j].style.zIndex=2;
					btn[j].style.background="#000";
			}
			imgs[this.index].style.zIndex=3;
			this.style.background="#c40000";
			conbox.style.backgroundColor=bannerarr[this.index];
		}
		btn[i].onmouseout=function(){
			time=setInterval(move,2000);
			num=this.index+1;
		}
	}
	
	var title=getClass("brand-tit1");
	var con=getClass("brand-con-cent1");
	for(var i=0;i<title.length;i++){
		title[i].index=i;
		title[i].onclick=function(){
			for(var j=0;j<con.length;j++){
				con[j].style.display="none";
				title[j].style.fontWeight="normal";
				title[j].style.textDecoration="none";
				title[j].style.color="#9c9c9c";
			}
			con[this.index].style.display="block";
			this.style.fontWeight="bold";
			this.style.textDecoration="underline";
			this.style.color="#000";
		}
	}
	var logo=getClass("brand-con1");
	var xin=getClass("xin");
	for(var k=0;k<logo.length;k++){
		logo[k].index=k;
		logo[k].onmouseover=function(){
			xin[this.index].style.cssText="display:block";
		}
		logo[k].onmouseout=function(){
			xin[this.index].style.display="none";

		}
	}

	var tex=$("#search1");
	tex.onfocus=function(){
		if(tex.value=="施华洛奇华丽入驻，璀璨好礼疯狂送"){
			tex.value="";
		}
	}
	tex.onblur=function(){
		if(tex.value==""){
			tex.value="施华洛奇华丽入驻，璀璨好礼疯狂送"
		}
	}
	var tex1=$("#search2");
	tex1.onfocus=function(){
		if(tex1.value=="施华洛奇华丽入驻，璀璨好礼疯狂送"){
			tex1.value="";
		}
	}
	tex1.onblur=function(){
		if(tex1.value==""){
			tex1.value="施华洛奇华丽入驻，璀璨好礼疯狂送"
		}
	}

	//顶部搜索框的显示与隐藏
	var search=$(".top-searchbox")[0];
    var flag=true;
    var flag1=true;
    var floors=$(".f1box");
    var jump=$(".jump")[0];
    var btn1=$("li",jump);
    for(var i=0;i<btn1.length;i++){
        btn1[i].index=i;
        btn1[i].onclick=function(){ 
        	var obj1=document.documentElement.scrollTop?document.documentElement:document.body;
            animate(obj1,{scrollTop:floors[this.index].t})
        }
    }
    var ch=document.documentElement.clientHeight;
    window.onscroll=function(){
    	var scrollT1=getScrolltop();
		for(var i=0;i<floors.length;i++){
			if(floors[i].offsetTop<scrollT1+ch){
				var imgs1=$("img",floors[i]);
				for(var j=0;j<imgs1.length;j++){
					imgs1[j].src=imgs1[j].getAttribute("aa");
				}
			}
		}
     	var scrollT=getScrolltop();
     	if(scrollT>=600){
     		if(flag){
     			animate(search,{top:0});
     			flag=false;
     			flag1=true;
     		}     			
     	}else{
            if(flag1){
               	animate(search,{top:-50});
               	flag1=false;
               	flag=true;
            }	   			
     	}
     	if(scrollT>=600){
	        	jump.style.display="block";
	        }else{
	        	jump.style.display="none";
	        }
            for(var i=0;i<floors.length;i++){
            	floors[i].t=floors[i].offsetTop;
            	if(floors[i].t<scrollT+1){
            		for(var j=0;j<btn1.length;j++){
            			btn1[j].style.backgroundColor="#f5f5f5";
            		}
            		btn1[i].style.backgroundColor="red";
            	}
            } 
    }

    //左侧logo轮播
    function lunboL(num){
    	var innerbox1=$(".f1-left-middleinner")[num];
		var btn11=$(".f1-jiantouleft")[num];
		var btn22=$(".f1-jiantouright")[num];
		function moveleft(){
			var first=getFirst(innerbox1);
			var last=getLast(innerbox1);
			animate(innerbox1,{left:-100},500,Tween.Linear,function(){
				innerbox1.appendChild(first);
				innerbox1.style.left=0;
			});
		}
		var t1=setInterval(moveleft,2000);
		function moveright(){
			var first=getFirst(innerbox1);
			var last=getLast(innerbox1);
			last.style.width=0;
			innerbox1.insertBefore(last,first);
			animate(last,{width:100},500,Tween.Linear);
		}
		btn11.onmouseover=btn22.onmouseover=function(){
			clearInterval(t1);
		}
		btn11.onmouseout=btn22.onmouseout=function(){
			t1=setInterval(moveleft,2000);
		}
		btn11.onclick=function(){
			moveleft();
		}
		btn22.onclick=function(){
			moveright();
		}
    }
    for(var i=0;i<6;i++){
    	lunboL(i);
    }

    var menucon=$('.menu-con-left')[0];
    var conleftlis=$('li',menucon);
    var caidans=$('.caidans');
    var menujiantou=$('.menu-jiantou');
    for(var i=0;i<conleftlis.length;i++){
    	conleftlis[i].index=i;
    	hover(conleftlis[i],function(){
    		caidans[this.index].style.display="block";
    		menujiantou[this.index].style.display="block";
    	},function(){
    		caidans[this.index].style.display="none";
    		menujiantou[this.index].style.display="none";
    	})
    }

    //下拉菜单
    var xialabox=$('.xialabox');
    var xiala=$('.xiala');
    for(var i=0;i<xialabox.length;i++){
    	xialabox[i].index=i;
    	hover(xialabox[i],function(){
    		xiala[this.index].style.display="block";
    	},function(){
    		xiala[this.index].style.display="none";
    	})
    }

    //右侧导航二级选项
    var rightyiji=$('.right-yiji');
    var righterji=$('.right-erji');
    for(var i=0;i<rightyiji.length;i++){
    	rightyiji[i].index=i;
    	hover(rightyiji[i],function(){
    		rightyiji[this.index].style.backgroundColor="#c40000";
    		righterji[this.index].style.display="block";
    		animate(righterji[this.index],{right:35},500);
    	},function(){
    		rightyiji[this.index].style.backgroundColor="#000";
    		righterji[this.index].style.display="none";
    		animate(righterji[this.index],{right:55},500);
    	})
    }
})