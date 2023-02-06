<?php
$url = $_SERVER['REQUEST_URI'];

// Split the URL
$urlExploded = explode('/', $url);

// Get the last element of the URL
$endpoint = end($urlExploded);

// Set the file based on the endpoint
switch ($endpoint) {
    case '/dashboard':
        header("Location: dashboard.php");
        break;
    case '/hosts':
        header("Location: hosts.php");
        break;
    case '/package':
        header("Location: package.php");
        break;
    case '/update_history':
        header("Location: updates_history.php");
        break;
    default:
        header("Location: dashboard.php");
        break;
}
