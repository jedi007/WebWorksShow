function shellSortAnimate(arr){
	console.log("before sort array is:-------------");
    console.log(arr);
    
    var stepArr = [1031612713, 217378076, 45806244, 9651787, 2034035, 428481, 90358, 19001, 4025, 1750, 836, 701, 301, 132, 57, 23, 10, 4, 1]; // reverse() 在维基上看到这个最优的步长 较小数组
	    
    var len = arr.length;
    var len2 =  parseInt(len/2);
          
    var preIndex, current;
    var step;
    
    for(var index = 0;index<stepArr.length; index++)
    {
    	if(stepArr[index] > len2){
			continue;
		}
    	step = stepArr[index];
    	for (var start = 0;start < step;start++)
    	{
    		//此处外层start循环仅仅是为了UI动画直观设置的，实际应用中，可去掉外层start循环，将内层的 “i += step”改为“i++”即可
    		UIshellGroup(start, step);
    		
    		for (var i = start + step; i < len; i += step) {
		        preIndex = i - step;
		        current = arr[i];
		        UIpopout(current);
		        while (preIndex >= 0 && arr[preIndex] > current) {
		        	UIswapHorizontal(arr[preIndex], current);
		        	
		        	arr[preIndex + step] = arr[preIndex];
		            preIndex -= step;
		        }
		        UIpushback(current);
		        arr[preIndex + step] = current;
		    }
    		
    		UIunshellGroup(start, step);
    	}
    	
    }
    
    
    console.log("after sort array is:-------------");
    console.log(arr);
    
    return arr;
}
