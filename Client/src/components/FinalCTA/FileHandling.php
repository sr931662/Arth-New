<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
    $file = fopen("Tagore.txt", "r");
    $content = fread($file, filesize("Tagore.txt"));
    // echo $content;
    if ($file) {
        echo "<ul>";
        while (($line = fgets($file)) !== false) {
            $filename = trim($line);
            echo "<li>$filename</li>";
        }
        echo "</ul>";
        fclose($file);
    } else {
        echo "Unable to open the file!";
    }
    ?>
    
</body>