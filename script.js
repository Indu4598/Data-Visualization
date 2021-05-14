



d3.json('data/words.json').then( data => {
   let chart_obj=new chart(data);
    chart_obj.create_bubble();
 let table_obj=new table(data);
   table_obj.create_table();


});






