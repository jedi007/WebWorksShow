;(function(){
	function MyDialog(){
		this.init();
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
			this.dialogdiv.style =  "width:300px;height: 200px; position:fixed;margin:auto;top:  0;bottom: 0;left: 0;right: 0;"+
								    "z-index: 999;box-shadow: 2px 2px 4px #ccc; background-color: #f1f1f1; border: solid 1px #aaa;"+
								    "border-radius: 4px; overflow: hidden;display:none";
									
			this.btnSize = {width:60,height:25};
			
			this.btnOK = document.createElement("button");
			this.btnOK.style =  "width:" + this.btnSize.width +"px;height:" + this.btnSize.height + 
													"px;position:absolute;bottom: 5px;right: "+ (this.btnSize.width+10) +"px;";
			this.btnOK.innerHTML = "OK";
			
			this.btnCancel = document.createElement("button");
			this.btnCancel.style =  "width:" + this.btnSize.width +"px;height:" + this.btnSize.height + "px;position:absolute;bottom: 5px;right: 5px;";
			this.btnCancel.innerHTML = "Cancel";
			
			this.dialogdiv.appendChild(this.closespan);
			this.dialogdiv.appendChild(this.titlediv);
			this.dialogdiv.appendChild(this.contentdiv);
			this.dialogdiv.appendChild(this.btnOK);
			this.dialogdiv.appendChild(this.btnCancel);
			
			this.pageCoverDiv = document.createElement("div");
			this.pageCoverDiv.style = "width: 100%; height: 100%; position: fixed; top:0;z-index: 998; "+
									  "background-color: #666; opacity: 0.5; display: none;";
			this.bPageCoverShow = true;
			
			document.body.appendChild(this.dialogdiv);
			document.body.appendChild(this.pageCoverDiv);
		},
		show:function(){
			this.dialogdiv.style.display='block';
			if(this.bPageCoverShow)
				this.pageCoverDiv.style.display = 'block';
		},
		close:function(){
			console.log("close is clicked");
			this.parentNode.style.display='none';
			this.parentNode.nextSibling.style.display='none';
		},
		setTitle:function(title){
			this.titlediv.innerHTML = title;
		},
		setContent:function(content){
			this.contentdiv.innerHTML = content;
		},
		setSize:function(width,height){
			var swidth = width?width:300;
			var sheight = height?height:200;
			this.dialogdiv.style.width = swidth+'px';
			this.dialogdiv.style.height = sheight+'px';
		},
		setOK_cb:function(cb){
			this.btnOK.onclick = function(){
				cb();
				this.parentNode.style.display='none';
				this.parentNode.nextSibling.style.display='none';
			}
		},
		setOK_hide:function(bh){
			if(bh)
				this.btnOK.style.display = 'none';
			else
				this.btnOK.style.display = 'block';
		},
		setCancel_cb:function(cb){
			this.btnCancel.onclick = function(){
				cb();
				this.parentNode.style.display='none';
				this.parentNode.nextSibling.style.display='none';
			}
		},
		setCancel_hide:function(bh){
			if(bh)
			{
				this.btnCancel.style.display = 'none';
				this.btnOK.style.right = '5px';
			}
			else
			{
				this.btnCancel.style.display = 'block';
				this.btnOK.style.right = (this.btnSize.width+10)+'px';
			}
		},
		setPageCover_hide:function(bh){
			if(bh)
			{
				this.pageCoverDiv.style.display = 'none';
				this.bPageCoverShow = false;
			}
			else
			{
				this.pageCoverDiv.style.display = 'block';
				this.bPageCoverShow = true;
			}
		},
		setClosebtn_hide:function(bh){
			if(bh)
				this.closespan.style.display = 'none';
			else
				this.closespan.style.display = 'block';
		}
	}
	
	
	window.creatMyDialog = function(){
		return new MyDialog();
	}
})();