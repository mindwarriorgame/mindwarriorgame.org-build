<?php

/**
 * Calculates height (preserving ratio). Otherwise smooth scrolling is broken somehow on Android (FAQ)
 *
 * (See https://stackoverflow.com/a/79088127/1432640)
 */
function renderImageTag($width, $image_path, $image_url) {
    // Get image dimensions
    list($original_width, $original_height) = getimagesize($image_path);

    // Calculate the height while maintaining the aspect ratio
    $height = ($original_height / $original_width) * $width;

    // Return the img tag with calculated width and height
    return '<img src="' . htmlspecialchars($image_url) . '" width="' . $width . '" height="' . round($height) . '" alt="Image">';
}
