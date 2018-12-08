;(function(){
	function extend(target, source) {
		for (var obj in source) {
			target[obj] = source[obj];
		}
		return target;
	}
	
	function MyDialog(){
		var _this=this;
		this.settings = {
			_this:this,
			title:"信息",
			content:"提示信息",
			width:300,
			height:200,
			btnWidth:60,
			btnHeight:25,
			OK_btntitle:"OK",
			OK_cb:function(){
				console.log("我是默认OK 回调");
				this._this.dialogdiv.style.display    = 'none';//这里this指向的是settings本身
				this._this.pageCoverDiv.style.display = 'none';
			},
			OK_hide:false,
			Cancel_btntitle:"Cancel",
			Cancel_cb:function(){
				console.log("我是默认Cancel 回调");
				this._this.dialogdiv.style.display    = 'none';//这里this指向的是settings本身
				this._this.pageCoverDiv.style.display = 'none';
			},
			Cancel_hide:false,
			Closebtn_hide:true,
			PageCover_hide:false
		};
		
		this.init();
		this.loadsetings();
	}
	
	MyDialog.prototype = {
		init:function(){
			this.closespan = document.createElement("span");
			this.closespan.style = "width: 20px; height: 20px; margin: 3px; float: right; cursor: pointer; color: #fff;";
			this.closespan.innerHTML = "&times;";
			this.closespan.onclick = this.close;
			
			this.titlediv = document.createElement("div");
			this.titlediv.style = "font-size: 16px; font-weight: bold; text-align :center;color: #fff; padding: 6px; background-color: #404040;user-select: none;";
			this.titlediv.innerHTML = "信息";
			
			this.contentdiv = document.createElement("div");
			this.contentdiv.style = "text-align :center;";
			this.contentdiv.innerHTML = "信息提示框";
			
			this.dialogdiv = document.createElement("div");
			this.dialogdiv.style =  "position:fixed;margin:auto;top:  0;bottom: 0;left: 0;right: 0;"+
									"z-index: 999;box-shadow: 2px 2px 4px #ccc; background-color: #f1f1f1; border: solid 1px #aaa;"+
									"border-radius: 4px; overflow: hidden;display:none";
			
			this.btnOK = document.createElement("button");
			this.btnOK.style =  "position:absolute;bottom: 5px;";
			this.btnOK.innerHTML = "OK";
			
			this.btnCancel = document.createElement("button");
			this.btnCancel.style =  "position:absolute;bottom: 5px;right: 5px;";
			this.btnCancel.innerHTML = "Cancel";
			
			this.dialogdiv.appendChild(this.closespan);
			this.dialogdiv.appendChild(this.titlediv);
			this.dialogdiv.appendChild(this.contentdiv);
			this.dialogdiv.appendChild(this.btnOK);
			this.dialogdiv.appendChild(this.btnCancel);
			
			this.pageCoverDiv = document.createElement("div");
			this.pageCoverDiv.style = "width: 100%; height: 100%; position: fixed; top:0;z-index: 998; "+
									  "background-color: #666; opacity: 0.5; display: none;";
			
			document.body.appendChild(this.dialogdiv);
			document.body.appendChild(this.pageCoverDiv);
		},
		loadsetings:function(){
			var sets = this.settings;
			
			this.titlediv.innerHTML   = sets.title;
			this.contentdiv.innerHTML = sets.content;
			
			this.dialogdiv.style.width  = sets.width+'px';
			this.dialogdiv.style.height = sets.height+'px';
			
			this.btnOK.style.width  = sets.btnWidth+'px';
			this.btnOK.style.height = sets.btnHeight+'px';
			this.btnOK.style.right  = (sets.btnWidth+10)+'px';
			
			this.btnCancel.style.width  = sets.btnWidth+'px';
			this.btnCancel.style.height = sets.btnHeight+'px';
			
			this.btnOK.innerHTML = sets.OK_btntitle;
			this.btnOK.onclick   = function(){
				this.parentNode.style.display='none';//里面的this是指向btnOK的
				this.parentNode.nextSibling.style.display='none';
				sets.OK_cb();
			}
			if(sets.OK_hide)
				this.btnOK.style.display = 'none';
			else
				this.btnOK.style.display = 'block';
				
			this.btnCancel.innerHTML = sets.Cancel_btntitle;
			this.btnCancel.onclick = function(){
				this.parentNode.style.display='none';//里面的this是指向btnCancel的
				this.parentNode.nextSibling.style.display='none';
				sets.Cancel_cb();
			}
			if(sets.Cancel_hide)
			{
				this.btnCancel.style.display = 'none';
				this.btnOK.style.right       = '5px';
			}
			else
			{
				this.btnCancel.style.display = 'block';
				this.btnOK.style.right       = (this.settings.btnWidth+10)+'px';
			}
			
			if(sets.Closebtn_hide)
				this.closespan.style.display = 'none';
			else
				this.closespan.style.display = 'block';
		},
		show:function(){
			this.dialogdiv.style.display='block';
			if(!this.settings.PageCover_hide)
				this.pageCoverDiv.style.display = 'block';
		},
		close:function(){
			this.parentNode.style.display             = 'none';
			this.parentNode.nextSibling.style.display = 'none';
		},
		setsettings:function(obj){
			if(typeof(obj) == "object")
			{
				extend(this.settings, obj);
				this.loadsetings();
			}
		}
	}
	
	window.creatMyDialog = function(){
		return new MyDialog();
	}
})();