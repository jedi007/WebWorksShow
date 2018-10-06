function combSortAnimate(arr){
	UIreadyCombSort();
	
	var len = arr.length;
    var step = arr.length;
    var temp;
    while(step > 1){
    	step = Math.floor(step / 1.3); //获取排序间隔
    	
    	for(var i = 0; i < step; i++)
    	{
    		UIshellGroup(i, step);
    		
    		for(var j = i + step; j < len; j += step)
    		{
    			UIactive(arr[j - step], arr[j]);
    			
    			if(arr[j - step] > arr[j])
    			{
    				UIswap(arr[j - step], arr[j]);
    				
    				temp = arr[j];
    				arr[j] = arr[j - step];
    				arr[j - step] = temp;
    			}
    			
    			UIunactive(arr[j - step], arr[j]);
    		}
    		
    		UIunshellGroup(i, step);
    	}
    }
    
    return arr;
}

function UIreadyCombSort(){
	AllBtnUnabled();
	$("#sortText").html("梳排序");
	$("#sortDescribe>p").html("&nbsp; &nbsp; &nbsp; &nbsp; 基本思想：梳排序和希尔排序很类似。"+
	"希尔排序是在直接插入排序的基础上做的优化，而梳排序是在冒泡排序的基础上做的优化。"+
	"也是像希尔排序一样，将待排序序列通过增量分为若干个子序列，然后对子序列进行一趟冒泡排序，"+
	"一步步减小增量，直至增量为1。所以梳排序的最后一次排序是冒泡排序。"+
    "<br><br>&nbsp; &nbsp; &nbsp; &nbsp; 梳排序增量是根据递减率减小的，递减率的设定影响着梳排序的效率，原作者以随机数作实验，得到最有效递减率为1.3的");
}