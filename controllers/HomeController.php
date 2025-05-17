<?php

namespace Controllers;

class HomeController {
    public static function index() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        include __DIR__ . '/../views/home/home.php';
    }
}