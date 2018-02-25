<?php

	// Getting POST data, performing some security checks
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$id = $request->hid;
	$id2 = addslashes($request->hid);
	if ($id != $id2) die("Invalid id");
	
	// Creating connection
	include 'config.php';
	$con = mysqli_connect($servername, $username, $password, $dbname);
	
	// Checking connection
	if (mysqli_connect_errno()){
		die("Connection failed: " . mysqli_connect_error());
	} 
	
	$sth = mysqli_prepare($con,"SELECT name,icon,version,author,type,description,id,data,date,titleid,screenshots,long_description,downloads,source,release_page FROM switchdb WHERE id=?");
	mysqli_stmt_bind_param($sth, "i", $id);
	mysqli_stmt_execute($sth);
	$data = mysqli_stmt_get_result($sth);
	
	while($r = mysqli_fetch_assoc($data)) {
				
		// Downloads counter support
		$masked_link = "https://switchdb.rinnegatamante.it/get_hb_link.php?id=" . $r['id'];
		$r['url'] = $masked_link;
		$rows[] = $r;
	
	}
	echo json_encode($rows, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

	mysqli_stmt_close($sth);
	mysqli_close($con);
?>