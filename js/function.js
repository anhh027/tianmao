//获取类名
//classname为要寻找的类名，obj为要寻找类名的父容器类名
function getClass(classname,obj){
        //若obj未赋值实参，即undefined，为false，那么obj=document
    	var obj=obj||document;
        //判断浏览是否为w3c
    	if(obj.getElementsByClassName){
    		return obj.getElementsByClassName(classname);
    	}else{
            //取所有标签名
    		var all=obj.getElementsByTagName("*");
    		var arr=[];
    		for(var i=0;i<all.length;i++){
                //调用checkre函数，true时执行arr.push。all[i].className为全标签类名
    			if(checkre(all[i].className,classname)){
    				arr.push(all[i]);
    			}
    		}
    		return arr;
    	}
    } 
    //str为多个类名集合的字符串，val为要寻找的类名
    function checkre(str,val){ 
    	var newarr=str.split(" ");
    	for(var i=0;i<newarr.length;i++){
    		if(newarr[i]==val){
    			return true;
    		}
    	}
    	return false;
    }

//获取、设置纯文本。obj为要获取的对象，val为要设置的文本
function getText(obj,val){
    //value为undefined，表示无设置参数，只获取文本
    if(val==undefined){
        //判断IE8
        if(obj.innerText){
            return obj.innerText
        }else{
            return obj.textContent;
        }
    //有参数，进行赋值
    }else{
        //检测IE8，或者对象内容为空字符串时，进行文本设置
        if(obj.innerText||obj.innerText==""){
            obj.innerText=val;
        }else{
            obj.textContent=val;
        }
    }
        
}

//获取、设置属性 obj为对象，atr为属性
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}


//识别获取类名id名标签名
function $(select,obj){
    var obj=obj||document;
    if(typeof select=="string"){
        //去掉字符串前后空格
        select=select.replace(/^\s*|\s*$/g,"");
        if(select.charAt(0)=="."){
            return getClass(select.slice(1),obj);
        }else if(select.charAt(0)=="#"){
            return obj.getElementById(select. slice(1));
        }else if(/^[a-z|1-6]{1,10}$/g.test(select)){
            return obj.getElementsByTagName(select);
        }
    }else if(typeof select=="function"){
        window.onload=function(){
            select();
        }
    }
}

//getChild(parent)  获取元素子节点
//"a":获取元素  "b":获取元素+文本
function getChildren(parent,type){
    var type=type||"a";
    var children=parent.childNodes;
    var arr=[];
    for(var i=0;i<children.length;i++){
        if(type=="a"){
            if(children[i].nodeType==1){
            arr.push(children[i]);
            }
        }else if(type=="b"){
            if(children[i].nodeType==1||(children[i].nodeType==3&&children[i].nodeValue.replace(/^\s*|\s*$/g,""))){
            arr.push(children[i]);
            }
        } 
    }
    return arr;
}


//获得第一个子节点
function getFirst(parent){
    return getChildren(parent)[0];
}

//获得最后一个子节点
function getLast(parent){
    return getChildren(parent)[getChildren(parent).length-1];
}

//获得一个指定子节点 Num:下标
function getNum(parent,num){
    return getChildren(parent)[num];
}

//获得下一个兄弟节点
function getNext(obj){
    var next=obj.nextSibling;
    while(next.nodeType==3||next.nodeType==8){
        next=next.nextSibling;
        if(next==null){
            return false;
        }
    }
    return next;
}

//获得上一个兄弟节点
function getUp(obj){
    var up=obj.previousSibling;
    if(up==null){
        return false;
    }
    while(up.nodeType==3||up.nodeType==8){
        up=up.previousSibling;
        if(up==null){
            return false;
        }
    }
    return up;
}

//插入到某个对象之后
//obj1为要插入对象，obj2为要插入他的后面
Object.prototype.insertbefore=function(obj1,obj2){
                var next=getNext(obj2);
                if(next){
                    this.insertBefore(obj1,next);
                }else{
                    this.appendChild(obj1);
                }
            }

//滚动条到页面顶部的距离
function getScrolltop(){
    var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
    return scrollT;
}

//一个元素添加事件
function addEvent(obj,ev,fun){
    if(obj.addEventListener){
        return obj.addEventListener(ev,function(){
            fun.call(obj);
        },false);
    }else{
        return obj.attachEvent("on"+ev,function(){
            fun.call(obj);
        })
    }
}

//元素拖动
function drag(obj){
    var cw=document.documentElement.clientWidth;
    var ch=document.documentElement.clientHeight;
    var ow=obj.offsetWidth;
    var oh=obj.offsetHeight;
    obj.onmousedown=function(e){
        var ev=e||window.event;
        var ox=ev.offsetX;
        var oy=ev.offsetY;
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
        document.onmousemove=function(e){
            var ev=e||window.event;
            var cx=ev.clientX;
            var cy=ev.clientY;
            var newx=cx-ox;
            var newy=cy-oy;
            if(newx<=0){
                newx=0;
            }
            if(newx>(cw-ow)){
                newx=cw-ow;
            }
            if(newy<=0){
                newy=0;
            }
            if(newy>(ch-oh)){
                newy=ch-oh;
            }
            obj.style.left=newx+"px";
            obj.style.top=newy+"px";
        }
    }
    obj.onmouseup=function(){
        document.onmousemove=null;
    }
}

//鼠标滚轮事件 upfun:滚轮向上函数;downfun:滚轮向下函数
function mouseWheel(obj,upfun,downfun){
    if(obj.attachEvent){ obj.attachEvent("onmousewheel",scrollFn);  //IE、 opera 
    }else if(obj.addEventListener){ 
        obj.addEventListener("mousewheel",scrollFn,false);   
        //chrome,safari    -webkit
        obj.addEventListener("DOMMouseScroll",scrollFn,false);  //firefox     -moz
    }
    function scrollFn(e){
        var ev=e||window.event;
        if(ev.preventDefault){//阻止默认浏览器动作(W3C) 
             ev.preventDefault();
        }else{
            ev.returnValue = false;
        }//IE中阻止函数器默认动作的 方式
        var num=ev.detail||ev.wheelDelta;
        if(num==-3||num==120){
            if(upfun){
                upfun();
            } 
        }
        if(num==3||num==-120){
            if(downfun){
                downfun();
            } 
        }
    }
}

//hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }