<!doctype html>
<html>
	<head>
		<title>Talitrum | hathix games</title>
		
		<link rel="shortcut icon" href="icon.ico" />
		<link rel="apple-touch-icon" href="icon.png" /><!-- for iDevice users -->
		<link rel="stylesheet" type="text/css" href="style.css" />
		
		<!--[if lt IE 9]><link rel="stylesheet" type="text/css" href="ie.css" /><![endif]-->
		
		<?php 
			function import_js($array){
				foreach($array as $src){
					echo "<script type='text/javascript' src='{$src}.js'></script>";
				}
			}
	
		import_js(array('core','boards','utils'));
	
		?>
		
	</head>
	<body>
		<div id="all">
			<div id="board_holder">
				<div id="board"></div>
				<h3 id="level_name"></h3>
			</div>
			<div id="help">
				Welcome to Talitrum. When you click one tile, it and all the tiles around it change color. Try to get all the tiles to be red.
			</div>
			
			<p>Enjoy Talitrum? <a href="http://is.gd/talitrum">Download it</a> free for your <strong>Android</strong> phone or tablet.</p>
			
			<p>Also at <a href="http://bit.ly/talitrum">bit.ly/talitrum</a>.
			
			<p style="text-align: center;">
				<select id="board_select"></select>&nbsp;&nbsp;
				<input type="button" id="restart" value="Restart this level" />
			</p>
			
			<!-- admob ads -->
			
			<script type="text/javascript">
			var admob_vars = {
			 pubid: 'a14deb7289e64db', // publisher id
			 bgcolor: '000000', // background color (hex)
			 text: 'FFFFFF', // font-color (hex)
			 test: false // test mode, set to false to receive live ads
			};
			</script>
			<script type="text/javascript" src="http://mmv.admob.com/static/iphone/iadmob.js"></script>
			
			
		</div>
		
	<!-- Piwik tracking... yes, you are being tracked. But it's open source. :) -->
		<script type="text/javascript">
		var pkBaseURL = (("https:" == document.location.protocol) ? "https://hathix.com/piwik/" : "http://hathix.com/piwik/");
		document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
		</script><script type="text/javascript">
		try {
		var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 1);
		piwikTracker.trackPageView();
		piwikTracker.enableLinkTracking();
		} catch( err ) {}
		</script><noscript><p><img src="http://hathix.com/piwik/piwik.php?idsite=1" style="border:0" alt="" /></p></noscript>

	<!-- End Piwik Tracking Tag -->			
	</body>
</html>