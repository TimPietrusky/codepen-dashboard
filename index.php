<?php header('Content-type: text/html; charset=utf-8'); ?>
<!doctype html>
<html lang="en">
<head>
    <title>CodePen Dashboard: Top 27 Editor Picks</title>

    <meta charset="utf-8">
    <meta name="author" content="Tim Pietrusky">
    <meta name="robots" content="index,follow">
    <meta name="revisit-after" content="1 days">
    <meta name="description" content="The latest 27 picks from the Editors of CodePen compared in a dashboard.">

    <meta property="og:title" content="CodePen Dashboard: Top 27 Editor Picks">
    <meta property="og:description" content="The latest 27 picks from the Editors of CodePen compared in a dashboard.">
    <?php //<meta property="og:image" content="http://timpietrusky.com/img/.jpg"> ?>
    <meta property="og:url" content="http://timpietrusky.com/codepen-dashboard">
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="css/codepen_dashboard.css">
    <link rel="shortcut icon" href="img/codepen_dashboard.ico" type="image/x-icon">
</head>

<body>
    
    <div class="dashboard">
      
       <div class="pure-g-r eta">
         <div class="pure-u-1-2">
           <h1>CodePen Top 27: <span>Editor Picks</span></h1>
         </div>
         
         <div class="pure-u-1-2">
           <table>
             <tr>
               <td>Hearts</td>
               <td>Views</td>
               <td>Comments</td>
             </tr>
           </table>
         </div>
      </div>
      
      <div class="loading">
        <div class="loading__alpha">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
     </div> 

    </div>

    <footer>
        <div class="pure-g">
            <div class="pure-u-1-2 text--left">
                <div class="theta">
                    <a href="https://github.com/TimPietrusky/codepen-dashboard" target="_blank">GitHub</a>
                </div>
            </div>
            
            <div class="pure-u-1-2 text--right">
                <div class="theta">
                    2013 by <a href="http://twitter.com/TimPietrusky" target="_blank">Tim Pietrusky</a>
                </div>
            </div>
        </div>
    </footer>
    
    
    <script type="text/html" id="template">
       <div class="pure-g-r alpha">

         <div class="pure-u-1-4">
            <div class="pure-g beta">
              
              <div class="pure-u-1">
                <h2 data-content="title"></h2>
              </div>
              
              <div class="pure-u-1">
                <div class="author">
                  <div class="pure-g">
                    <div class="pure-u-1-4">
                      <img class="epsilon" data-src="authorPicture" />
                    </div>

                    <div class="pure-u-3-4">
                      <h3 data-content="author"></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>
         
         <div class="pure-u-3-4">
           <div class="pure-g-r gamma">

             <div class="pure-u-1-3 overflow">
               <img class="pen__link" data-src="penPicture" data-alt="CodePen preview"/>
             </div>   
             
             <div class="pure-u-2-3">
               <table>
                 <tr class="chart"></tr>
               </table>
             </div>
             
           </div>
         </div>
      </div>
    </script>
    


</body>

<script src="js/libs.js"></script>
<script src="js/codepen_dashboard.min.js"></script>

</html>
