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
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo asset('/build/css/base.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/buttons.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/components.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/forms.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/layout.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/responsive.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/typography.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/utilities.css') ?>">
    <link rel="stylesheet" href="<?php echo asset('/build/css/tables.css') ?>">



</head>
<body>
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