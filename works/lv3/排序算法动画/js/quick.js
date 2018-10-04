function quickSortAnimate(array){
	AllBtnUnabled();
	$("#sortText").html("快速排序");
	
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