<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
		<link rel="stylesheet" href="scripts/jqui/jquery-ui.min.css">
		<link rel="stylesheet" href="style.css">
		<script src = 'scripts/jquery-3.3.1.js'></script>
		<script src = 'scripts/jqui/jquery-ui.min.js'></script>
		<script src = 'scripts/classes/WidthShower.js'></script>
		<!--- React --->
		<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
		<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
		<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>			
		<!--- React end --->	
		<!--<script type = 'text/babel' src = 'scripts/test.js'></script>-->
		<script type="text/javascript">		
			jQuery(document).ready(function(){
				var tagRegExpr = /\#[0-9a-zа-я\-/\_]{1,}(\s|$|\,|\.)/im;
				var str = '#привет ещё #тег2 #тег3, #тег4';
				var result = str.match(tagRegExpr);
				console.log(result);
			});	
		</script>
	</head>	
	<body>
		<p>4 комит</p> 		
				

	</body>
	
</html>







	
	