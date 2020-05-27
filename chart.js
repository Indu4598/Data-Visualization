class chart {

    constructor(data) {
        this.data = data;
       // this.array=["economy/fiscal issues", "energy/environment", "crime/justice", "education", "health care", "mental health/substance abuse"];
        //console.log(this.array);
    }


    create_bubble() {

        var heading1 = document.createElement("h4");
        heading1.textContent = "Democratic Leaning";
        heading1.setAttribute('class', 'head1');
        document.body.append(heading1);

        var heading2 = document.createElement("h4");
        heading2.textContent = "Republican Leaning";
        heading2.setAttribute('class', 'head2');
        document.body.append(heading2);

        // console.log(this.data[0])
        var main = d3.select("body").select("#chart").append("svg").attr("width", 1000).attr("height", 1000).attr("class","main");
        // main.append("rect").attr("width",1000).attr("height",1000);
        //   console.log(d3.select(".main").attr("x"));



      d3.select("body").append("div").attr("class","tip").style("opacity",0);




        // console.log(this.data[0]["sourceX"])


        // function (d) {
        //     reutrn(d.sourceX);
        // }
        //
        // console.log(x);

        // var data = [10, 15, 20, 25, 30];
        var scale1 = d3.scaleLinear()
            .domain([50, 0])
            .range([0, 380]);

        // Add scales to axis
        var x_axis1 = d3.axisBottom()
            .scale(scale1);

        var scale2 = d3.scaleLinear()
            .domain([0, 60])
            .range([30, 492]);

        // Add scales to axis
        var x_axis2 = d3.axisBottom()
            .scale(scale2);


        var x1_ele = main.append("g")
            .attr("transform", "translate(30,60)")
            .call(x_axis1.ticks(5))
            .call(g => g.select(".domain").remove());

        var x2_ele = main.append("g")
            .attr("transform", "translate(380,60)")
            .call(x_axis2.ticks(6))
            .call(g => g.select(".domain").remove());

        main.append("line")
            .attr("x1", 412)
            .attr("y1", 95)
            .attr("x2", 412)
            .attr("y2", 210)
            .attr("class","line")
            .attr("stroke","black")
            .attr("stroke-width","0.8")

        let tooltip=d3.select('.tip');



        // x1_ele.selectAll("line").remove();
        // x2_ele.selectAll("line").remove();

        // var jsonCircles = [
        //     {"x_axis": 30, "y_axis": 30, "radius": 20, "color": "green"},
        //     {"x_axis": 70, "y_axis": 70, "radius": 20, "color": "purple"},
        //     {"x_axis": 110, "y_axis": 100, "radius": 20, "color": "red"}];

        //   var max=this.data[0]["total"];
        //   var min=this.data[0]["total"];
        // //  console.log(max)
        // //   console.log(this.data[0][sourceX])
        //   for(let i=0;i<this.data.length;i++){
        //       if(max<this.data[i]["total"]){
        //           console.log(this.data[i]["total"])
        //           max=this.data[i]["total"]
        //       }
        //       if(min>this.data[i]["total"]){
        //           min=this.data[i]["total"]
        //       }
        //   }

        var min = Math.min.apply(null, this.data.map(function (i) {
            return i.total;
        }))

        var max = Math.max.apply(null, this.data.map(function (i) {
            return i.total;
        }))

        //
        // console.log(min);
        // console.log(max);
        // var radius_scale=d3.scaleLinear().domain([5,50]).range(2,20);
        // console.log(radius_scale(10));

        // var x = d3.scaleLinear()
        //     .domain([5, 50])
        //     .range([2, 15]);

        var x = d3.scaleLinear()
            .domain([min, max])
            .range([3, 13]);

        var category = this.data.map(i => i.category)
        //  console.log(category);
        var unique_cat = category.filter((v, i, a) => a.indexOf(v) == i);

        console.log(unique_cat);
      //  this.array=unique_cat;
        var colorScale = d3.scaleOrdinal().domain(unique_cat)
            .range(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f']);


        //  console.log(x(20));
        //     x(50); // 320

        var circles = main.selectAll("circle").data(this.data).enter().append('circle');


        // circles.exit().remove();
        //
        // var new_circle = circles.enter().append('circle');
        //
        // circles = new_circle.merge(circles);

        circles.attr("cx", function (d) {
            return d.sourceX;
        })
            .attr("cy", function (d) {
                return 155 + d.sourceY;
            })
            .attr("r", function (d) {
                return x(d.total)
            })
            .attr("fill", function (d) {
                return colorScale(d.category);
            })
            .attr("stroke", "black")
            .attr("class","bees");

        let that=this;

        circles.on('mouseover',function (d,i) {
            tooltip.transition().duration(200)
                .style("opacity",.9);
            tooltip.html(that.tooltipRender(d) + "<br/>")
                .style("left",(d3.event.pageX)+"px")
                .style("top",(d3.event.pageY-28)+"px");

        });


        circles.on('mouseout',function () { tooltip.transition().duration(200)
            .style("opacity",0);
        })

        let call = d3.select("#button").on("click",this.story);
        //
        // .attr("title", function (d) {
        //      console.log(d.category);
        // })

    //console.log(circles);

    //    document.getElementById("check").addEventListener ("click", this.updatechart1,false );
        d3.select("#check").on("click",this.updatechart)

    }

    updatechart() {

       var ischeck=document.getElementById("check").checked;
       if(ischeck){
         //  console.log("ih");
           // var ex_circle=document.getElementsByClassName("bees");
           // var t = d3.transition()
           //     .duration(500);


         var unique_cat1=["economy/fiscal issues", "energy/environment", "crime/justice", "education", "health care", "mental health/substance abuse"];

           for(let i=0;i<unique_cat1.length;i++){
               if(i!=5 && i!=4) {
                   d3.select(".main").append("text").attr("x", 30).transition().duration(1000).attr("y", (i + 1) * 140).attr("class", "tittle").text(unique_cat1[i])
               }
               if(i==4){
                   d3.select(".main").append("text").attr("x", 30).transition().duration(1000).attr("y", 680).attr("class", "tittle").text(unique_cat1[i])
               }
               if(i==5){
                   d3.select(".main").append("text").attr("x", 30).transition().duration(1000).attr("y", 825).attr("class", "tittle").text(unique_cat1[i])
               }
           }

            d3.selectAll(".bees").join(this.data).transition().duration(1000).attr("cx",function (d) {
                return d.moveX;
            })
                .attr("cy",function (d) {
                    return 220+d.moveY;
                })
                // .transition(t);

            //var text_ele=main.
           d3.select(".line").join("line").transition().duration(1000).attr("x1",412).attr("y1",105).attr("x2",412).attr("y2",900).attr("stroke-width",0.8);
       }
       else{

          // d3.select(".main").selectAll(".tittle").transition().duration(500).remove();
         d3.select(".main").selectAll(".tittle").transition().attr("delay", function(d,i){return 1000*i})
       .attr("duration", function(d,i){return 1000*(i+1)}).remove();

           d3.selectAll(".bees").join(this.data).transition().duration(1000).attr("cx",function (d) {
               return d.sourceX;
           })
               .attr("cy",function (d) {
                   return  200+d.sourceY;
               })
           d3.select(".line").join("line").transition().duration(1000).attr("x1",412).attr("y1",135).attr("x2",412).attr("y2",255).attr("stroke-width",0.8);
       }


    }

tooltipRender(d){

var text;
        if(d['percent_of_d_speeches']>d['percent_of_r_speeches']) {
             text = "<h2>" + d['phrase'] + "</h2>" + "<h2>" + "D" + d['position'].toFixed(2) + "</h2>" + "<h2>" + d['total']/50*100 + "</h2>"
            // console.log(d);
        }
    else{
             text = "<h2>" + d['phrase'] + "</h2>" + "<h2>" + "R" + d['position'].toFixed(2) + "</h2>" + "<h2>" + d['total']/50*100 + "</h2>"
              // console.log(d);
        }

        return text;
}
    story()
    {
        let i = 0;
      //  console.log("hi");

        let div = d3.select("body").append("div").attr("id","overlay")
        let rect =  div.append("svg").attr("width","1000").attr("height","1000")
        let rect1 = rect.append("rect").attr("x","30").attr("y","200").attr("width","80").attr("height","80").attr("fill","white").attr("transform","translate(45,10)");
        rect1.append("text").text("Democratic speeches") .attr("x",0)
            .attr("y",0)
            .attr("dy", ".35em")
        let rect2 = rect.append("rect").attr("x","500").attr("y","200").attr("width","80").attr("height","80").attr("fill","white").attr("transform","translate(45,10)");
        rect1.append("text").text("Republican Speeches") .attr("x",0)
            .attr("y",0)
            .attr("dy", ".35em")

        document.getElementById("overlay").onclick = function(){d3.select("#overlay").remove()}
        //this.overlayoff()
        //console.log(x)




    }




}