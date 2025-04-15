<!DOCTYPE html>
<?php
    function asset($path)
    {
        $fullPath = $_SERVER['DOCUMENT_ROOT'] . $path;
        if (file_exists($fullPath)) {
            return $path . '?v=' . filemtime($fullPath);
        }
        return $path;
    }
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barbflow</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Delius+Swash+Caps&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Leckerli+One&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo asset('/build/css/base.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/buttons.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/components.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/forms.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/layout.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/responsive.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/typography.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/utilities.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/tables.css') ?>">
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.4.0/dist/shoelace.js"></script>
    <script type="module" src="<?php echo asset('/build/js/shoelace-components.js'); ?>"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.4.0/dist/themes/light.css">
</head>
<body>
<?php include __DIR__ . '/templates/navbar.php'; ?>
<div class="contenedor-app">
      
        <div class="app">
            <?php echo $contenido; ?>
        </div>
    </div>


    <?php
        echo $script ?? '';
    ?>

</body>
</html>