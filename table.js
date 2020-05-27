class table{

    constructor(data) {
        this.data = data;

        this.columns = ["phrase","frequency","percentage","total"];


            this.cell = {
                "width": 200,
                "height": 20,
                "buffer": 15
            };

            this.bar = {
                "height": 20
            };

    }

    create_table()
    {


        var min = Math.min.apply(null, this.data.map(function (i) {
            return i.total/50;
        }))

        var max = Math.max.apply(null, this.data.map(function (i) {
            return i.total/50;
        }))

        // console.log(max);
        // console.log(min);

        var frequency_scale=d3.scaleLinear().domain([0,1]).range([0,100])


        var category1 = this.data.map(i => i.category)

        var unique_cat = category1.filter((v, i, a) => a.indexOf(v) == i);

        console.log(unique_cat);
        //  this.array=unique_cat;
        var colorScale = d3.scaleOrdinal().domain(unique_cat)
            .range(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f']);


        var percentagescale1=d3.scaleLinear().domain([0,100]).range([100,0])
        var percentagescale2=d3.scaleLinear().domain([0,100]).range([0,100])


        var x_freq=d3.axisTop().scale(frequency_scale);
        var x_percent1=d3.axisTop().scale(percentagescale1);
        var x_percent2=d3.axisTop().scale(percentagescale2);



        var x_ele1=d3.select("#freq_head").append("svg").attr("width",300).attr("height",30).append("g").attr("transform","translate(40,20)").call(x_freq.ticks(3));
        x_ele1.call(g=>g.select(".domain").remove());

        var x_ele2=d3.select("#percentage_head").append("svg").attr("width",300).attr("height",30)

        var x_percentesvg1=x_ele2.append('g').attr("transform","translate(10,20)").call(x_percent1.ticks(2));
        var x_percentesvg2=x_ele2.append('g').attr("transform","translate(110,20)").call(x_percent2.ticks(2));


        x_percentesvg1.call(g=>g.select(".domain").remove());
        x_percentesvg2.call(g=>g.select(".domain").remove());

        var sortAscending = true;



       var table=d3.select("#table1").select("tbody");
       var  rows=d3.select('tbody').selectAll("tr").data(this.data);
       rows.exit().remove();
       var new_rows=rows.enter().append("tr");
       rows=new_rows.merge(rows);

       var cols=this.columns;
        var cells = rows.selectAll('td').data(function (d) {
            return cols.map(function(column){

                if(column=="frequency"){ return {'cat':d['category'],'vis':'bar1', 'value':d['total']}}
                if(column=="percentage"){ return {'vis':'bar2', 'd_s':d['percent_of_d_speeches'],'d_r':d['percent_of_r_speeches']}}
                else {
                                    return { vis: "text", value: d[column] }
                                }


            })

        })
        cells.exit().remove();

        var new_cells= cells.enter()
            .append('td')


        cells=new_cells.merge(cells);


        cells.text(function (d) {
            if(d['vis']=="text")
            return d['value']

        });

        var svg_rects=cells.filter(function (d) {
            return d.vis!=="text"

        }).append("svg").attr("width", this.cell.width )
            .attr("height",this.cell.height);

       var bar_cols=svg_rects.filter(function(d){
           return d.vis==='bar1';
       })

bar_cols.append("rect");
bar_cols.select("rect").attr("height",this.bar.height)
    .attr("width", function(d){
        return frequency_scale(d.value/50);
        }

    )
    .attr("height",this.bar.height)
    .attr("fill",function (d) {
       //console.log(d.cat);
        return colorScale(d.cat);
    }).attr("transform","translate(40,0)")


     var percentcols=svg_rects.filter(function (d) {
        return d.vis==="bar2";
     })

        var demo=percentcols.append('g').attr('class','blue');
        var rep=percentcols.append('g').attr('class','red');

demo.append('rect')
        demo.select("rect").attr("height",this.bar.height)
     .attr("width",function (d) {

       return  d.d_s ? percentagescale1(d.d_s) : 0;
     })
     .attr("fill","#6057AD")
     .attr("transform","translate(110,0),scale(-1,1)")


        rep.append('rect')
        rep.select("rect").attr("height",this.bar.height)
            .attr("width",function (d) {

                return  d.d_r ? percentagescale2(d.d_r):0;
            })
            .attr("fill","#FA8072")
            .attr("transform","translate(113,0),scale(1,1)")


let sort_headers= cols.map(()=>false);
//console.log(sort_headers);
//console.log("chak-h");

d3.selectAll("thead th").data(this.columns).on("click",(k,i)=>{
    let invert;
    if(sort_headers[i]===true){

        sort_headers[i]=false;
        invert=true;
    }else{
        sort_headers=cols.map(()=>{
            return false;
        });
        sort_headers[i]=true;
        invert=false;
    }

    this.data=this.data.sort((a,b)=>{

        if(invert){

            let temp=b;
            b=a;
            a=temp;
        }

        if(k==='frequency'){
            console.log(k)
            // console.log(b['total'])
            // console.log(a['total'])
            // if(b['total']===a['total']){
            //     return a.key < b.key ?  -1:1
            // } else{
                return b['total']-a['total'];
           // }
        }

        if(k==='total'){
            // console.log(k)
            // console.log(b['total'])
            // console.log(a['total'])
            // if(b['total']===a['total']){
            //     return a.key < b.key ?  -1:1
            // } else{
                return b['total']-a['total'];
            //}
        }

        if(k==='percentages'){
            // console.log(k)
            // console.log(b['total'])
            // console.log(a['total'])
            // if(b['total']===a['total']){
            //     return a.key < b.key ?  -1:1
            // } else{
                return b['total']-a['total'];
           // }
        }
       else{
           return a['phrase']<b['phrase'] ? -1:1
        }



    });
    this.update();
    });

    }

   update(){
       var frequency_scale=d3.scaleLinear().domain([0,1]).range([0,100])


       var category1 = this.data.map(i => i.category)

       var unique_cat = category1.filter((v, i, a) => a.indexOf(v) == i);

       console.log(unique_cat);
       //  this.array=unique_cat;
       var colorScale = d3.scaleOrdinal().domain(unique_cat)
           .range(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f']);


       var percentagescale1=d3.scaleLinear().domain([0,100]).range([100,0])
       var percentagescale2=d3.scaleLinear().domain([0,100]).range([0,100])


       var table=d3.select("#table1").select("tbody");
       var  rows=d3.select('tbody').selectAll("tr").data(this.data).join("tr");
       console.log(rows);
       rows.remove();
       // var new_rows=rows.enter().append("tr");
       // rows=new_rows.merge(rows);
       var new_rows=table.selectAll("tr").data(this.data).join("tr");
      // console.log(new_rows);

       var cols=this.columns;
       // var old_cells=new_rows.selectAll("td")
       // old_cells.remove();
       console.log(cols);

       var cells = new_rows.selectAll('td').data(function (d) {
           return cols.map(function(column){

               if(column=="frequency"){ return {'cat':d['category'],'vis':'bar1', 'value':d['total']}}
               if(column=="percentage"){ return {'vis':'bar2', 'd_s':d['percent_of_d_speeches'],'d_r':d['percent_of_r_speeches']}}
               else {
                   return { vis: "text", value: d[column] }
               }


           });

       }).join("td");
       // cells.exit().remove();
       //
       // var new_cells= cells.enter()
       //     .append('td')
       //
       //
       // cells=new_cells.merge(cells);


       cells.text(function (d) {
           if(d['vis']=="text")
               return d['value']

       });

       var svg_rects=cells.filter(function (d) {
           return d.vis!=="text"

       }).append("svg").attr("width", this.cell.width )
           .attr("height",this.cell.height);

       var bar_cols=svg_rects.filter(function(d){
           return d.vis==='bar1';
       })

       bar_cols.append("rect");
       bar_cols.select("rect").attr("height",this.bar.height)
           .attr("width", function(d){
                   return frequency_scale(d.value/50);
               }

           )
           .attr("height",this.bar.height)
           .attr("fill",function (d) {
               //console.log(d.cat);
               return colorScale(d.cat);
           }).attr("transform","translate(40,0)")


       var percentcols=svg_rects.filter(function (d) {
           return d.vis==="bar2";
       })

       var demo=percentcols.append('g').attr('class','blue');
       var rep=percentcols.append('g').attr('class','red');

       demo.append('rect')
       demo.select("rect").attr("height",this.bar.height)
           .attr("width",function (d) {

               return  d.d_s ? percentagescale1(d.d_s) : 0;
           })
           .attr("fill","#6057AD")
           .attr("transform","translate(110,0),scale(-1,1)")


       rep.append('rect')
       rep.select("rect").attr("height",this.bar.height)
           .attr("width",function (d) {

               return  d.d_r ? percentagescale2(d.d_r):0;
           })
           .attr("fill","#FA8072")
           .attr("transform","translate(113,0),scale(1,1)")
   }

}