function oddEvenSortAnimate(arr){
	UIreadyOddEvenSort();
	
	var len = arr.length;
	var sorted = true;
	
	while(sorted){
		sorted = false;
		
		UIshellGroup(0, 2);
		for(var i = 0; i < len - 1; i += 2)
		{
			UIactive(arr[i], arr[i + 1]);
			
			if(arr[i] > arr[i + 1]){
				UIanimatesarray.push({fun:UIswap, args:[ arr[i], arr[i + 1] ]});
				
				var tmp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = tmp;
				sorted = true;
			}
			
			UIunactive(arr[i], arr[i + 1]);
		}
		UIanimatesarray.push({fun:UIuntagallshell});
		
		UIshellGroup(0, 2);
		for(var i = 1; i < len - 1; i += 2)
		{
			UIactive(arr[i], arr[i + 1]);
			
			if(arr[i] > arr[i + 1])
			{
				UIanimatesarray.push({fun:UIswap, args:[ arr[i], arr[i + 1] ]});
				
				var t = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = t;
				sorted = true;
			}
			
			UIunactive(arr[i], arr[i + 1]);
		}	
		UIanimatesarray.push({fun:UIuntagallshell});
	}
	
	UIdonextstep();
	return arr;
}

function UIreadyOddEvenSort(){
	AllBtnUnabled();
	$("#sortText").html("奇偶排序");
	$("#sortDescribe>p").html("我不太清楚有多少人跟我一样，看到奇偶排序的第一感觉是，"+
	"对数组中的奇数列和偶数列分别进行排序，再使用类似归并排序中的合并操作使整体有序。"+
　　"不过，这里的臆想并不是奇偶排序的思想，希望大家不要将上面的思路理解成奇偶排序。"+
	"纠错之后，让我们来看看真正的奇偶排序是什么样的吧。奇偶排序的核心是，"+
	"以奇数列为基准和以偶数列为基准对整个数组进行排序。"+
	"而排序的元素只有两个，基准元素和其右侧相邻的一个元素。原理可参见下面的算法原理图."+

	"<ol>"+
	"<li>选取所有奇数列的元素与其右侧相邻的元素进行比较，将较小的元素排序在前面；</li>"+
	"<li>选取所有偶数列的元素与其右侧相邻的元素进行比较，将较小的元素排序在前面；</li>"+
	"<li>重复前面两步，直到所有序列有序为止。</li></ol>");
}