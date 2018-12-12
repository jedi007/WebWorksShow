var titlesize = 12,tpadding = 6,xtitlesize = 11,ytitlesize = 11,xlabelsize = 10,ylabelsize = 10,
	xtpadding = 12, ytpadding = 14,ylbrotate = -60,xlbrotate = 30,
	gridl = '22%',gridr = '8%',gridtop = '15%',gridb = '20%',
	PSDlegY = '15px',PSDlegsize = 9, PSDlegWidth = 15, PSDlegHeight = 10,
	RRIpsize = 1,RRIellipsewidth = 2,SDtsize = 10,
	DFApsize = 2,DFAlwidth = 1,DFAtsize = 10,DFAtpadding = 5;

function initRR(){
	var myChart_RR = echarts.init(document.getElementById('RR'));
						
	var optionchart_RR = {
							title : {
								text: 'RR Distribution',
								x: 'center',
								y: tpadding,
								textStyle:{
									fontSize:titlesize
								}
							},
							grid: {  
								left: gridl, 
								right: gridr,
								top:gridtop,
								bottom:gridb  
							}, 
							tooltip : {
								trigger: 'axis'
							},
							animation: false,//关闭动画效果
							xAxis : [
								{
									type : 'value',
									//min: 0.6,
									name:'RR(s)',
							        nameLocation:'middle',
							        nameTextStyle:{
							            color:"black", 
							            fontSize:xtitlesize,  
							            padding:xtpadding
							        },
									axisLabel:{ 
										rotate:xlbrotate,
										textStyle:{
											fontSize:xlabelsize 
										}
									}
								}
							],
							yAxis : [
								{
									type : 'value',
									name:'Nbr of beats',
							        nameLocation:'middle',
							        nameTextStyle:{
							            color:"black", 
							            fontSize:ytitlesize,  
							            padding:ytpadding
							        },
									axisLabel:{ 
										rotate:ylbrotate,
										textStyle:{
											fontSize:ylabelsize 
										}
									}
								}
							],
							color:  [ 
										'#436EEE'
									],
							series : [
								{
									name:'次数',
									type:'bar',
									data:RRI_data,
									//barWidth : 30,//柱图宽度
								}
							]
						};
	myChart_RR.setOption(optionchart_RR);
}

function initPSD(){
	var myChart_PSD = echarts.init(document.getElementById('PSD'));
	var optionchart_PSD = {
		title : {
			text: 'RR Spectrum',
			x: 'center',
			textStyle:{
				fontSize:titlesize
			}
		},
		grid: {  
			left: gridl, 
			right: gridr,
			top:gridtop,
			bottom:gridb 
		}, 
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			data:['VLF','LF','HF'],
			y: PSDlegY,
			textStyle:{
				fontSize:PSDlegsize
			},
			itemWidth:PSDlegWidth,
			itemHeight:PSDlegHeight
		},
		color:  [ 
					'#B5B5B5', '#cd5c5c', '#32cd32'
				],
		calculable : false,//拖拽重计算功能
			animation: false,//关闭动画效果
		xAxis : [
			{
				type : 'value',
				max: 0.5,
				name:'Frequency(Hz)',
		        nameLocation:'middle',
		        nameTextStyle:{
		            color:"black", 
		            fontSize:xtitlesize,  
		            padding:xtpadding
		        },
				axisLabel:{ 
					rotate:xlbrotate,
					textStyle:{
						fontSize:xlabelsize 
					}
				}
			}
		],
		yAxis : [
			{
				type : 'value',
				max: 0.067,
				name:'PSD(S²/Hz)',
		        nameLocation:'middle',
		        nameTextStyle:{
		            color:"black", 
		            fontSize:ytitlesize,  
		            padding:ytpadding
		        },
				axisLabel:{ 
					rotate:ylbrotate,
					textStyle:{
						fontSize:ylabelsize 
					}
				}
			}
		],
		series : [
			{
				
						
							symbol: "none",
				name:'VLF',
				type:'line',
							smooth:false,   //关键点，为true是不支持虚线的，实线就用true
				itemStyle: {normal: {
								areaStyle: {type: 'default'},
								lineStyle:{
										color:'black',
			width:1,
			type:'solid'  //'dotted'虚线 'solid'实线
		}
							
								}},
				data:PSDdata_VLF
			},
			{
				symbol: "none",
				name:'LF',
				type:'line',
				itemStyle: {normal: {
											areaStyle: {type: 'default'},
											lineStyle:{
													color:'black',
													width:1,
													type:'solid'  //'dotted'虚线 'solid'实线
											}
										}},
				data:PSDdata_LF
			},
			{
				symbol: "none",
				name:'HF',
				type:'line',
				itemStyle: {normal: {
														areaStyle: {type: 'default'},
														lineStyle:{
																color:'black',
																width:1,
																type:'solid'  //'dotted'虚线 'solid'实线
														}
													}},
				data:PSDdata_HF
			}
		]
	};
	myChart_PSD.setOption(optionchart_PSD);
}

function initRRI(){
	var myChart_RRI = echarts.init(document.getElementById('RRI'));
	var optionchart_RRI = {
			animation: false,//关闭动画效果
			title : {
							text: 'Poincare Plot',
							x: 'center',
							y:tpadding,
							textStyle:{
								fontSize:titlesize
							}
			},
			grid: {  
				left: gridl, 
				right: gridr,
				top:gridtop,
				bottom:gridb 
			}, 
			tooltip : {
					trigger: 'item',
					showDelay : 0,
					formatter : function (params) {
							if( params.componentType == "series" )
							{
								if (params.value.length > 1) {
									return params.seriesName + '  '
										+ params.value[0] + ' , ' 
										+ params.value[1] + '  ';
								}
								else {
										return params.seriesName + '  '
											+ params.name + '  '
											+ params.value + '  ';
								}
							}
					},  
					axisPointer:{
							show: true,
							type : 'cross',
							lineStyle: {
									type : 'dashed',
									width : 1
						}
				}
			},
			color:  [ 'blue'],
			xAxis : [
					{
						type : 'value',
						scale:true,
						name:'RRn(ms)',
			        	nameLocation:'middle',
			        	nameTextStyle:{
				            color:"black", 
				            fontSize:xtitlesize,  
				            padding:xtpadding
	        			},
						axisLabel:{ 
							rotate:xlbrotate,
							textStyle:{
								fontSize:xlabelsize 
							}
						}
					}
			],
			yAxis : [
					{
						type : 'value',
						scale:true,
						name:'RRn+1(ms)',
				        nameLocation:'middle',
				        nameTextStyle:{
				            color:"black", 
				            fontSize:ytitlesize, 
				            padding:ytpadding
				        },
						axisLabel:{ 
							rotate:ylbrotate,
							textStyle:{
								fontSize:ylabelsize 
							}
						}
					}
			],
			series : [
					{
							name:'RRI',
							type:'scatter',
							symbolSize: function (val) {
										return RRIpsize;//散点的大小
								},
							data: Poincaredata,
							markLine : {
								data: [
									[
										{
												coord: RRISDxy[0],
												symbol: 'none'
										},
										{
												name: 'SD1',
												label:{
													normal:{
														show:true,
														position:'end',
														formatter: '{b}',
														verticalAlign:'bottom',
														fontSize:SDtsize,
														color:'red'
													}
												},
												coord: RRISDxy[1],
												lineStyle: { normal:{type: 'solid', color:'black' ,width:1}},
												symbol: 'arrow'
										}
									],
									[
										{
												coord: RRISDxy[2],
												symbol: 'none'
										},
										{
												name: 'SD2',
												label:{
													normal:{
														show:true,
														position:'end',
														formatter: '{b}',
														verticalAlign:'bottom',
														fontSize:SDtsize,
														color:'green'
													}
												},
												coord: RRISDxy[3],
												lineStyle: { normal:{type: 'solid', color:'black' ,width:1}},
												symbol: 'arrow'
										}
									]
								]
							}
					},
					{
						name:'RRIellipse',
						type:'line',
						data: RRIellipse,
						color:'red',
						symbol:'none',
						z:3,
						lineStyle: {width:RRIellipsewidth}
					}
			]
	};
	myChart_RRI.setOption(optionchart_RRI);
}

function initDFA(){
	var myChart_DFA = echarts.init(document.getElementById('DFA'));
	var optionchart_DFA = {
		title : {
					text: 'DFA',
					x: 'center',
					y:tpadding,
					textStyle:{
						fontSize:titlesize
					}
		},
		grid: {  
			left: gridl, 
			right: gridr,
			top:gridtop,
			bottom:gridb 
		}, 
		tooltip : {
		trigger: 'item',
		showDelay : 0,
		formatter : function (params) {
			if( params.componentType == "series" )
			{
				if (params.value.length > 1) {
				return params.seriesName + '  '
				   + params.value[0] + ' , ' 
				   + params.value[1] + '  ';
				}
				else {
					return params.seriesName + '  '
					   + params.name + '  '
					   + params.value + '  ';
				}
			}
			
		},  
		axisPointer:{
			show: true,
			type : 'cross',
			lineStyle: {
				type : 'dashed',
				width : 1
			}
		}
		},
		color:  [ 'blue'],
		animation: false,//关闭动画效果
		xAxis : [
				{
						type : 'value',
						scale:true,
						name:'log n',
				        nameLocation:'middle',
				        nameTextStyle:{
				            color:"black", 
				            fontSize:xtitlesize,  
				            padding:xtpadding
				        },
						axisLabel:{ 
							rotate:xlbrotate,
							textStyle:{
								fontSize:xlabelsize 
							}
						}
				}
		],
		yAxis : [
			{
				type : 'value',
				scale:true,
				name:'log F(n)',
		        nameLocation:'middle',
		        nameTextStyle:{
		            color:"black", 
		            fontSize:ytitlesize,  
		            padding:ytpadding
		        },
				axisLabel:{ 
					rotate:ylbrotate,
					textStyle:{
						fontSize:ylabelsize 
					}
				}
			}
		],
		series : [
			{
				name:'DFA',
				type:'scatter',
				symbolSize: function (val) {
					return DFApsize;//散点的大小
				},
				data: DFAdata,
				markLine : {
					data: [
						[
							{
								coord: DFAakb[0],
								symbol: 'none'
							},
							{
								name: 'α1',
								label:{
									normal:{
									show:true,
																position:'middle',
																formatter: '{b}',
																padding:DFAtpadding,
																fontSize:DFAtsize
																			}
																},
								coord: DFAakb[1],
								lineStyle: { normal:{type: 'solid', color:'red' ,width:DFAlwidth}},
								symbol: 'none'
							}
						],
						[
							{
								coord: DFAakb[2],
								symbol: 'none'
							},
							{
								name: 'α2',
								label:{
									normal:{
										show:true,
																	position:'middle',
																	formatter: '{b}',
																	padding:DFAtpadding,
																	fontSize:DFAtsize
																}
															},
								coord: DFAakb[3],
								lineStyle: { normal:{type: 'solid', color:'black' ,width:DFAlwidth}},
								symbol: 'none'
							}
						]
					]
				}
			}
		],
	};

	myChart_DFA.setOption(optionchart_DFA);
}