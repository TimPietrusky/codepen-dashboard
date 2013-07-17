/*
 * CodePen Dashboard
 *
 * Based on http://chartjs.org
 * and my CodePen API 
 * https://github.com/TimPietrusky/codepen-awesomepi
 *
 * Please don't judge the JS. I'm going to port it to Backbone. 
 *
 * 
 * 2013 by Tim Pietrusky
 * timpietrusky.com
 */

var colors = {
  alpha : "#f7464a",
  beta : "#e2eae9",
  gamma : "#2980b9",
  delta : "#ff0",
  epsilon : "#0f0"
};

var result = {
  hearts : 0,
  views : 0,
  comments: 0,
  max_hearts : 0,
  max_views : 0,
  max_comments : 0
};

var pens,
    size = 110,
    strokeWidth = 3,
    page = 1,
    page_max = 3,
    run = false;

var dashboard = $('.dashboard'),
    loading = $('.loading');

breakpoint();

function getData(username, type) {
  $.ajax({
      dataType: 'jsonp',
      jsonp: 'jsonp',
      url: 'http://codepen-awesomepi.timpietrusky.com/' + type + "/" + page, 
      success: function(data) {
        if (data.content != null) {
          
          if (pens == null) {
            pens = data.content.pens;
          } else {
            for (var i = 0; i < data.content.pens.length; i++) {
              pens.push(data.content.pens[i]);
            }
          }

          if (++page <= page_max) {
            getData(username, type);
          } else {
            generateDashboard(username);
          }
        }
      }
  });
}
          
function generateDashboard(username) {
  
  for (var i = 0; i < pens.length; i++) {
    
    result["hearts"] += pens[i]["hearts"];
    result["views"] += pens[i]["views"];
    result["comments"] += pens[i]["comments"];
    
    if (result["max_hearts"] <= pens[i]["hearts"]) {
      result["max_hearts"] = pens[i]["hearts"];
    }
    
    if (result["max_views"] <= pens[i]["views"]) {
      result["max_views"] = pens[i]["views"];
    }
    
    if (result["max_comments"] <= pens[i]["comments"]) {
      result["max_comments"] = pens[i]["comments"];
    }
  }
  
  for (var i = 0; i < pens.length; i++) {
    
    var pen = pens[i];
    var realname = pen['user']['realname'];
    var title = pen['title'];
    
    if ((pos = realname.search(/Pro/)) != -1) {
      realname = realname.slice(0, realname.length - 4);
      realname += '<span class="iota">PRO</span>';
    }
    
    if (title == null) {
      title = "A Pen by " + realname;
    }
    
    var group = $('<section></section>').loadTemplate($("#template"),
    {
        title: title,
        author: realname,
        authorPicture : pen['user']['gravatar'],
        penPicture: 'http://codepen.io/'+username+'/pen/'+pen['hash']+'/image/large.png',
        description: pen['description'],
        url : pen['url']['pen']
    });
    
    // Hearts
    var data = [
      { 
        value: pens[i]["hearts"],
        color: colors['alpha']
      },
      {
        value : result["max_hearts"] - pens[i]["hearts"],
        color : colors['beta']
      }
    ];
    newChart("Hearts", data, pen, group);
    
    
    // Views
    var data = [
      { 
        value: pens[i]["views"],
        color: colors['gamma']
      },
      {
        value : result["max_views"] - pens[i]["views"],
        color : colors['beta']
      }
    ];
    newChart("Views", data, pens[i], group);
    
    
    // Comments
    var data = [
      { 
        value: pens[i]["comments"],
        color: colors['delta']
      },
      {
        value : result["max_comments"] - pens[i]["comments"],
        color : colors['beta']
      }
    ];
    newChart("Comments", data, pens[i], group);
    
    run = false;
  }
}  


function newChart(title, data, pen, group) {
  var canvas = newCanvas();
  new Chart(canvas['ctx']).Doughnut(data, { 
    segmentStrokeWidth: strokeWidth, 
    animateScale : true, 
    animationSteps : 120,
    percentageInnerCutout : 70
  });
  var url_pen = pen['url']['pen'],
      pen_username = pen['user']['nickname'];
  var type = title.toLowerCase();
  
  if (!run) {
    group.find('h2').wrapAll('<a href="'+url_pen+'" target="_blank"/>');
    group.find('.pen__link').wrapAll('<a href="'+url_pen+'" target="_blank" />');
    group.find('.author img').wrapAll('<a href="http://codepen.io/'+pen_username+'" target="_blank" />');
    group.find('.author h3').wrapAll('<a href="http://codepen.io/'+pen_username+'" target="_blank" />');
    run = true;
  }

  group.find('.title').append(title);
  var td = $('<td></td>').append(canvas['canvas']);
  td.append($('<div class="zeta">'+ pen[type] + '</div>'));
  group.find('.chart').append(td);

  dashboard.append(group);

  if (loading.filter(":visible")) {
    loading.hide();
  }
}

function newCanvas() {
  var canvas = $('<canvas width="'+size+'" height="'+size * 1.5+'"></canvas>');
  return { canvas: canvas, ctx : canvas.get(0).getContext("2d") };
}
 
function template(options) {
  var template =  $('<div />').loadTemplate($("#"+options.name), options);
  return template;
}

function breakpoint() {
  var window_width = window.innerWidth;
  
  if (window_width != undefined) { 
    if (window_width > 2200) {
      size = 150;
    }
  }
}

// Start the application
getData("TimPietrusky", "picks");

// Google analytics
var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-5596313-1']);_gaq.push(['_setDomainName', 'timpietrusky.com']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();