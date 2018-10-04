function bubbleSortAnimate(array){
	AllBtnUnabled();
	$("#sortText").html("冒泡排序");
	
	var len = array.length,i,j;
	for(i=len;i--;){
		for(j=0; j<i; j++){
			let Lnumber = array[j];
			let Rnumber = array[j+1];
			
			UIactive(Lnumber, Rnumber);
			
			if(Lnumber > Rnumber){
				
				UIswap(Lnumber, Rnumber);
				
				array[j] = Rnumber;
				array[j+1] = Lnumber;
			}
			
			UIunactive(Lnumber, Rnumber);
		}
	}
	return array;
}