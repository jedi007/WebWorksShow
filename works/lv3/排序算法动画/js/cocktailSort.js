function cocktailSortAnimate(arr){
	UIreadyCocktailSort();
	
	var left = 0;
	var right = arr.length - 1;
	var i = 0, temp = 0;
	
	while(left < right)
	{
		for(i = left; i < right; i++)
		{
			UIactive(arr[i], arr[i+1]);
			
			if(arr[i] > arr[i+1])
			{
				UIswap(arr[i], arr[i+1]);
				
				temp = arr[i+1];
				arr[i+1] = arr[i];
				arr[i] = temp;
			}
			
			UIunactive(arr[i], arr[i+1]);
		}
		UItagone(arr[right]);
		right--;
		
		for(i = right;i > left;i--)
		{
			UIactive(arr[i], arr[i-1]);
			
			if(arr[i-1] > arr[i])
			{
				UIswap(arr[i-1], arr[i]);
				
				temp = arr[i];
				arr[i] = arr[i-1];
				arr[i-1] = temp;
			}
			
			UIunactive(arr[i], arr[i-1]);
		}
		UItagone(arr[left]);
		left++;
	}
	
	UItagone(arr[left]);//当数组元素为单数个时，最后一个元素不会进入循环。
	
	return arr;
}
		
function UIreadyCocktailSort(){
	AllBtnUnabled();
	$("#sortText").html("鸡尾酒排序");
	$("#sortDescribe>p").html("鸡尾酒排序的概念:鸡尾酒排序又叫定向冒泡排序，鸡尾酒搅拌排序，"+
	"搅拌排序（也可以视作选择排序的一种变形），涟漪排序，来回排序或快乐小时排序，是冒泡排序的一种变形。"+
	"此算法与冒泡排序的不同处在于排序时是以双向在序列中进行排序。"+

	"<ol>鸡尾酒排序的算法描述如下："+
	"<li>先对数组从左到右进行升序的冒泡排序；</li>"+
	"<li>再对数组进行从右到左的降序的冒泡排序；</li>"+
	"<li>以此类推，持续的、依次的改变冒泡的方向，并不断缩小没有排序的数组范围；</li></ol>");
}