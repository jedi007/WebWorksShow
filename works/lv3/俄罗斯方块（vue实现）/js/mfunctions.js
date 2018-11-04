//多维数组深拷贝
function deepcopy(obj) {

    var out = [],i = 0,len = obj.length;

    for (; i < len; i++) {
        if (obj[i] instanceof Array){
            out[i] = deepcopy(obj[i]);
        }
        else out[i] = obj[i];
    }

    return out;
}

//判断是否是数组
function isArrayFn (value) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	}else{
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}