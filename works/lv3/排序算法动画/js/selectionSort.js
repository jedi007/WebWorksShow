function selectionSortAnimate(arr){
	UIreadySelectionSort();
	
	var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
    	minIndex = i;
        
        UIanimatesarray.push({fun:UItagLR, args:[ arr[minIndex] ]});
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                UIanimatesarray.push({fun:UIuntagLR, args:[ arr[minIndex] ]});
                minIndex = j;                 // 将最小数的索引保存
                UIanimatesarray.push({fun:UItagLR, args:[ arr[minIndex] ]});
            }
        }
        temp = arr[i];
        
        UIanimatesarray.push({fun:UIswap, args:[ arr[i], arr[minIndex] ]});
        UIanimatesarray.push({fun:UIuntagLR, args:[ arr[minIndex] ]});
        UIanimatesarray.push({fun:UItagone, args:[ arr[minIndex] ]});
        
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    UIanimatesarray.push({fun:UItagone, args:[ arr[len-1] ]});
    
    UIdonextstep();
    return arr;
}

function UIreadySelectionSort(){
	AllBtnUnabled();
	$("#sortText").html("选择排序");
	$("#sortDescribe>p").html("选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理："+
	"首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，"+
	"再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。"+

	"<ol>n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下："+
	"<li>初始状态：无序区为R[1..n]，有序区为空；</li>"+
	"<li>第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。"+
		"该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，"+
		"使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区;</li>"+
	"<li>n-1趟结束，数组有序化了。</li></ol>");
}