<?php
/*
* Plugin Name: FaL Directory Builder
* Plugin URI: https://fortrou.dev
* Description: A flexible builder for frontend forms and custom listings. Create, manage, and display user-submitted content with ease.
* Author: Serhii Nechyporenko
* Author URI: https://fortrou.dev
* License: GPL v2 or later
* License URI: https://www.gnu.org/licenses/gpl-2.0.html
* Version: 0.1.0
* Requires at least: 6.1
* Requires PHP: 7.4
*/

require_once "config.php";
require_once "functions.php";
require_once "classes/fal-app.php";
$app = new Fal_App();