$(document).ready( function() {
	var posturl = 'ajax/twi!analysis.action';
	$("#analysis").click( function() {
	    $("#progress_div").css('display','block');
 	    $("#chart_div").css('display','none');
 	    $("#help_div").css('display','none');
        $.post(
        	posturl,
           {twiMid :$("#twiMid").val()},
           function(data){
        	   var res = eval(data);
               var actionErrors = res.actionErrors;
               if(typeof(actionErrors) != "undefined" && actionErrors != "") {
	        	   $("#error_div").css('display','block');
	        	   $("#error_div").text(actionErrors);
	        	   $("#progress_div").css('display','none');
               } else {	        	   
	        	   setTimeout(pollServer,1000);
               }
            },
            'json'
        );
        
        function pollServer(){
    		$.post(
    		           'ajax/twi!progress.action',
    		           {twiMid :$("#twiMid").val()},
    		           function(data){
    		               var res = eval(data);
    		               var progress = res.progress;
    		               if(progress < 100) {
    		            	   $("#progress_bar").css("width",progress + "%");
    		            	   setTimeout(pollServer,1000);
    		               } else {
    		            	   $("#progress_div").css('display','none');
    		            	   $("#chart_div").css('display','block');
    		            	   var twiText = res.twiText;
    			               $("#twiText").text(twiText);
    			               var userTypeData = res.userTypeData;
    			               var userGenderData = res.userGenderData;
    			               var repostRatioData = res.repostRatioData;
    			               var locationData = res.locationData;
    			               var topRepostData = res.topRepostData;
    			               var topFollowersData = res.topFollowersData;
    			               var verifiedUsers = res.verifiedUsers;

    			               iChart(function(){
    			            	 var chart1 = new iChart.Pie2D({
       			           			background_color : '#EFEFEF',
       			           			render : 'repostRatio',
       			           			data: repostRatioData,
       			           			title : '转发/评论比率',
       			           			shadow:true,
       			           			shadow_color:'#c7c7c7',
    			    				sub_option:{
			    						mini_label : true,
    			    				}
       			           		});
       			           		chart1.draw();
       			           		
    			           		var chart2 = new iChart.Pie2D({
    			           			background_color : '#EFEFEF',
    			           			render : 'repostUserType',
    			           			data: userTypeData,
    			           			title : '用户类别分析',
    			           			shadow:true,
    			           			shadow_color:'#c7c7c7',
    			    				sub_option:{
			    						mini_label : true,    			    						
    			    				}
    			           		});
    			           		chart2.draw();
    			           		
    			           		var chart3 = new iChart.Pie2D({
    			    				background_color : '#EFEFEF',
    			    				render : 'repostSex',
    			    				data: userGenderData,
    			    				title : '用户性别分析',
    			    				shadow:true,
    			    				shadow_color:'#c7c7c7',
    			    				sub_option:{ 
    			    						mini_label : true,    			    						
    			    				}
    			    			});
    			    			chart3.draw();
    			    			
    			    			var chart4 = new iChart.Pie2D({
    			    				background_color : '#EFEFEF',
    			    				render : 'repostLocation',
    			    				data: locationData,
    			    				title : '用户区域分析',
    			    				shadow:true,
    			    				shadow_color:'#c7c7c7'
    			    			});
    			    			chart4.draw();
    			           		
    			    			var chart5 = new iChart.Column2D({
    			    				background_color : '#EFEFEF',
    			    				render : 'topRepostData',
    			    				data: topRepostData,
    			    				title : '二次转发用户排行',
    			    				shadow:true,
    			    				shadow_color:'#c7c7c7',
    			    				width : 800,
    			    				height : 400,
    			    				label : {
    			    					fontsize:11,
    			    					textAlign:'right',
    			    					textBaseline:'middle',
    			    					rotate:-45,
    			    					color : '#666666'
    			    					}, 
    			    			});
    			    			chart5.draw();
    			    			var chart6 = new iChart.Column2D({
    			    				background_color : '#EFEFEF',
    			    				render : 'topFollowersData',
    			    				data: topFollowersData,
    			    				title : '用户粉丝排行',
    			    				shadow:true,
    			    				shadow_color:'#c7c7c7',
    			    				width : 800,
    			    				height : 400,
    			    				label : {
    			    					fontsize:11,
    			    					textAlign:'right',
    			    					textBaseline:'middle',
    			    					rotate:-45,
    			    					color : '#666666'
    			    					}, 
    			    			});
    			    			chart6.draw();
    			    			var vuserlist = $("#vuserlist");
    			    			var cssarray = new Array("", "label-success", "label-warning", "label-important", "label-info", "label-inverse");
    			    			for(var i=0; i<verifiedUsers.length;i++) {
    			    				var newspan = $("<span/>").addClass("label").html(verifiedUsers[i]);
    			    				newspan.addClass(cssarray[i%6]);
    			    				newspan.css("padding","10px, 10px");
    			    				newspan.appendTo(vuserlist);
    			    			}
    			    			
    			               });
    		               }
    		            },
    		            'json'
    		        );
    	}
        
    });

	if(typeof($("#twiMid").val()) != "undefined" && $("#twiMid").val() != "") {
		posturl = 'ajax/twi!chart.action';
		$("#analysis").click();
	}
});