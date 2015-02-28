<?php
/**
 * @package Image_Exif
 * @version 1.6
 */
/*
Plugin Name: Image Exif
Plugin URI: http://www.celeryliu.com
Description: This is a plugin that will show exif information for your image.
Version: 0.1
Author: Celery Liu
Author URI: http://www.celeryliu.com
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

function load_js(){
	wp_enqueue_script( 'custom_js', plugins_url( '/js/imgexif.js', __FILE__ ), array('jquery','jquery-ui-core','jquery-ui-dialog'),"1.0",true );
	wp_enqueue_style( 'custom_css', plugins_url('/css/style.css', __FILE__ ) ); 

	$author_nonce = wp_create_nonce('author_example');
	wp_localize_script('custom_js', 'ajax_object', array( 
		'ajax_url' => admin_url( 'admin-ajax.php' ), 
		'author' => $author_nonce,
	));
}

add_action('wp_enqueue_scripts', 'load_js');

function get_exif(){
	check_ajax_referer('author_example');
	echo read_exif($_POST["url"]);
	wp_die();
}

function read_exif($img_file){
		$exif = exif_read_data($img_file, 'EXIF');

		$exif_ = array (
			'Make'=>$exif['Make'],
			'Model'=>$exif['Model'],
			'ExposureTime'=>$exif['ExposureTime'],
			'FNumber'=>$exif['FNumber'],
			'ISOSpeedRatings'=>$exif['ISOSpeedRatings'],
			'FocalLength'=>$exif['FocalLength'],
		);
	
	return json_encode($exif_);
}

add_action('wp_ajax_exif', 'get_exif');
add_action('wp_ajax_nopriv_exif', 'get_exif');	//for no loggin user

?>