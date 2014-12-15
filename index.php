<!DOCTYPE html>
<html>
	<head>
	<meta charset="UTF-8">
    <title>Ernie Classic Chat Room</title>
    <link rel="stylesheet" href="./style.css" type="text/css"/>
    <script type= "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type= "text/javascript" src="./chatFunctions.js"></script>
</head>

<body>
	<div id="col-window">
		<div class="chat-box">
			<div id="chat-box-background">
				<div id="chat-window">
				
				</div>
			</div>							
		</div>	
		<form id="chat-form" name = "chat-form" action="process.php" >
			<div id="wrapping" class="clearfix">
				<section id="aligned">
					<input type="text" name="name" id="name" placeholder="Your name" autocomplete="off" class="txtinput"/>
					<input type="text" name="language" id="language" placeholder="Language" autocomplete="off" class="txtinput"/>					
					<textarea name="message" id="message" placeholder="Please enter your message..." class="txtblock"></textarea>					
					<input type="submit" name="button" id="button" value="send" />			                                    
      		</section>
			<div>
		</form>
	</div>	
</body>
</html>

