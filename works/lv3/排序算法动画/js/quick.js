function quickSortAnimate(array){
	AllBtnUnabled();
	$("#sortText").html("快速排序");
	$("#sortDescribe>p").html("快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，"+
	"其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。"+
	"快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下："+

	"<ol>"+
	"<li>从数列中挑出一个元素，称为 “基准”（pivot）；</li>"+
	"<li>重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。"+
		"在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；</li>"+
	"<li>递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。</li></ol>");
	
	
	if(array.length == 0){
		return array;
	}
	var i = 0;
	var j = array.length - 1;
	var Sort = function(left, right){
		//递归结束条件
		if(left >= right)
			return; 
		
		let Basekey = array[left];
		let i = left;
		let j = right;
		
		UItagone(Basekey);
		
		UItagLR(array[i+1]);
		UItagLR(array[j]);		
		
		while(i < j)
		{
			//先从右往左开始找更好
			while(array[j] >= Basekey && i < j)
			{
				UIuntagLR(array[j]);
				j--;
				UItagLR(array[j]);
			}
				
				
			//再从左往右找
			while(array[i] <= Basekey && i < j)
			{
				UIuntagLR(array[i]);
				i++;
				UItagLR(array[i]);
			}
				
			if(i < j)
			{
				UIswap(array[i],array[j]);
				
				let temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}
		
		//快速排序基准数归位
		UIswap(array[left],array[i]);
		UIuntagLR(array[i]);
		array[left] = array[i];
		array[i] = Basekey;
		
		UIuntagone(Basekey);
		
		Sort(left, i-1);
		Sort(i+1, right);
	}
	
	Sort(i, j);
	return array;
}