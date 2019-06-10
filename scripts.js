 $(document).ready(function(){
              

/*----------------------------------Pulling JSON Data in over server.js------------------------------------------------*/

    
		$.getJSON('/show_all', function(data){
			var contacts_data = "";
			$.each(data.contacts, function(key, value){
				contacts_data += "<tr>";
				contacts_data += "<td>" + value.name + "</td>";
				contacts_data += "</tr>";
                console.log(Object.keys(data.contacts).length);
                
			});
            
            
			$("#contacts_table").append(contacts_data);	sortAlphabetical();
            
			$(".show-number").append(" " + "(" + (Object.keys(data.contacts).length) + ")");
             
            
		});
     
 /*---------------------------------Sorting contacts List on page load ( check back on this )-------------------------------------------------*/ 
     
function sortAlphabetical() {
  var table, rows, sortcontacts, i, a, b, moveName;
  table = document.getElementById("contacts_table");
  sortcontacts = true;
  
      while (sortcontacts) { sortcontacts = false;

            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
              moveName = false;
              a = rows[i].getElementsByTagName("td")[0]; b = rows[i + 1].getElementsByTagName("td")[0];

                if (a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase()) {
                    moveName = true;
                    break;}
            }

            if (moveName) {
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              sortcontacts = true;}
      }
}
    
//    $("#contacts_table tbody td").sort(asc_sort).append("contacts_table");
//        function asc_sort(a,b){
//            return($(b).text()) < ($(a).text()) ? 1 : -1
//        }
//    


/*---------------------------------Query for live search function to search contact list-------------------------------------------------*/ 


		$("#search").keydown(function(){
			$.getJSON('/show_all', function(data){
				var search = $("#search").val();
				var regex = new RegExp(search, 'i');
				var output;
				$.each(data.contacts, function(key, val){
                //this allows you to search by name, email or mobile
				if((val.name.search(regex) != -1) || (val.email.search(regex) != -1 || (val.mobile.search(regex) != -1))){
				//output the records inside a table row
                output += "<tr>";
				output += "<td id='" + key + "'>" + val.name + "</td>";
				output += "</tr>";
				}
				});
				$('tbody').html(output); sortAlphabetical();
			});
		});
		
		$("#contacts_table tbody").hover(function() {
			$(this).css("cursor", "pointer");
		});
    

    /*---------------------------------hover feature for quick view / EMILY adjust from contact details-------------------------------------------------*/ 

    $( "#contacts_table tbody" ).on( "mouseover", "td", "quickview", function() {
			var meem = $( this ).text();
			$.getJSON('/show_all', function(data) {
			$.each(data.contacts,function(key,value){
				if(value.name == meem){
					$(".qvprofilepic").html(" <img src=" + value.avatar + ">");
                    $(".qvprofilename").html("<br><strong><p>Name:</strong> " + value.name + "</p> ");
                    $(".qvmobilecontent").html("<strong><p>Telephone:</strong> " + value.mobile + "</p> ");
				
				}
		});
		});
		});
    

    
   /*---------------------------------on click feature to pull stuff into a full view div -------------------------------------------------*/  
    

		$( "#contacts_table tbody" ).on( "click", "td", function() {
            var meem = $( this ).text();
			$.getJSON('/show_all', function(data) {
			$.each(data.contacts,function(key,value){
				if(value.name == meem){
                   $(".profilepic").html(" <img src=" + value.avatar + "><br>");
					$(".profilename").html("<strong><p>Name:</strong><br>" + value.name + " </p>");
					$(".emailcontent").html("<strong><p>Email:</strong><br> " + value.email + "</p> ");
					$(".mobilecontent").html("<strong><p>Telephone:</strong><br> " + value.mobile + " ");
                    $(".addresscontent").html("<strong><p>Address:</strong><br> " + value.address + " <br>  " + value.city + " <br> " + value.country + " </p> ");
                    
                    $("#contactdetails").slideDown(500);
				}
		});
		});
		});
     
  
 /*---------------------------------Help js / Anno -------------------------------------------------*/     
   
  $("#help").on("click",function(){
    var intro = new Anno([
    { 
        target:'#help',
        content: "Hi! Welcome to our Address Book. This is a quick walkthrough to show you the how the application works, enjoy!",
        position: 'left'
    },
        {
        target: '#search',
        content: "In a rush? This search bar can help you find the exact contact you need.",
        position: 'center-bottom'
    },
        {
        target: '#contactstooltip',
        content: "In this area you will see all your contacts in your address book listed. Use your scroll on the right to find a contact you need. Click on one of your contacts to find out further details.",
        position: 'right'
    },
        {
        target: '.qvtooltip',
        content: "Hovering over one of the contacts name will show a preview of the information here.",
        position: 'center-bottom'
    },
        {
        target: '.cdtooltip',
        content: "Clicking on one of the contact names will show all the details here.",
        position: 'center-top'
    },
    
    ]);
        intro.show();
});                 
     
     
 /*---------------------------------This is the font sizer controller for accessiblity  --------------------------------------*/  
       $('.increase, .decrease').click(function(){
                   var td_size   =   parseInt($('#contacts_table').find('td').css('font-size'));
                    var body_size   =   parseInt($('body').find('p h1 h2 h3 td tr').css('font-size'));
                   var p_size   =   parseInt($('#quickview').find('p').css('font-size'));
                   var h1_size   =   parseInt($('.col').find('h1').css('font-size'));
                   var h2_size   =   parseInt($('.col').find('h2').css('font-size'));
                   var h3_size   =   parseInt($('.col').find('h3').css('font-size'));
                    
                    
                    if( $(this).hasClass('increase') ){
                      $('#contacts_table').find('td').css('font-size', td_size +2);
                      $('#quickview').find('p').css('font-size', p_size +2);
                      $('#contactdetails').find('p').css('font-size', p_size +2);
                      $('.col').find('h1').css('font-size', h1_size +2);
                      $('.col').find('h2').css('font-size', h2_size +2);
                      $('.col').find('h3').css('font-size', h3_size +2);
                   }
                    else if( $(this).hasClass('decrease') ){
                      $('#contacts_table').find('td').css('font-size', td_size -2);
                      $('#quickview').find('p').css('font-size', p_size -2);
                      $('#contactdetails').find('p').css('font-size', p_size -2);
                      $('.col').find('h1').css('font-size', h1_size -2);
                      $('.col').find('h2').css('font-size', h2_size -2);
                      $('.col').find('h3').css('font-size', h3_size -2);
                   }
                   
                
               });
		
	});	