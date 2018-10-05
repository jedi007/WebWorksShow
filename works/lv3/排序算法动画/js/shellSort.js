function shellSortAnimate(arr){
	console.log("before sort array is:-------------");
    console.log(arr);
    UIreadyShellSort();
    
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

function UIreadyShellSort(){
	AllBtnUnabled();
	$("#sortText").html("希尔排序");
	$("#sortDescribe>p").html("1959年Shell发明，第一个突破O(n2)的排序算法，是简单插入排序的改进版。"+
	"它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。"+

	"<ol>先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述："+
	"<li>选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；</li>"+
	"<li>按增量序列个数k，对序列进行k 趟排序；</li>"+
	"<li>每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，"+
		"分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。</li></ol>");
}