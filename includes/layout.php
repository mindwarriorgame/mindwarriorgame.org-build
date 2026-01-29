<!DOCTYPE html>
<html lang="<?=$LANG;?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$TITLE; ?></title>
    <link rel="stylesheet" href="/includes/layout.css?<?=time();?>">
    <link rel="stylesheet" href="/includes/popup.css?<?=time();?>">

    <?php
        if (isset($CSS)) {
            foreach ($CSS as $css) {
                echo "<link rel='stylesheet' href='$css?" . time() ."'>";
            }
        }
    ?>
</head>
<body>
<?php
    $LINK_EXT = getenv('LINK_EXT');
    if (!isset($ACTIVE_MENU)) {
        $ACTIVE_MENU = '';
    }
?>
<button class="menu-btn">☰</button>

<div class="container">
    <div class="sidebar" id="sidebar">
        <div id="logo"><img src="/images/layout/ai-generated-8707933_1280-modified-small.png" alt="MindWarrior" title="MindWarrior" /></div>
        <ul>
            <li class="store-links">
                <a href="https://t.me/MindWarriorGame_bot" target="_blank" aria-label="Play on Telegram">
                    <img class="store-icon telegram-icon" src="/images/telegram.svg" alt="Telegram" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.mindwarrior.app" target="_blank" aria-label="Play on Android">
                    <img class="store-icon play-badge" src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt="Google Play" />
                </a>
            </li>
            <?php
                $class = $ACTIVE_MENU == 'quick-start' ? "active" : "";
            ?>
            <li class="<?=$class;?>"><a href="/quick-start.<?=$LANG;?>.<?=getenv('LINK_EXT');?>"><?=$MENU['quick-start']; ?></a></li>

            <?php
            $class = $ACTIVE_MENU == 'public-formulas' ? "active" : "";
            ?>
            <li class="<?=$class;?>"><a href="/public-formulas.<?=$LANG;?>.<?=getenv('LINK_EXT');?>"><?=$MENU['public-formulas']; ?></a></li>

            
        </ul>
        <h2><?=$MENU['faq']; ?></h2>
        <ul id="faq-questions">
            <?php
                $menuKeys = ['purpose', 'formula', 'review', 'forgot', 'difficulty', 'pause', 'formula-formatting', 'controls', 'name', 'formula-example', 'share', 'privacy'];

                foreach ($menuKeys as $key) {
                    echo "<li data-target='{$key}'><a href=\"/faq.{$LANG}.{$LINK_EXT}#{$key}\">{$MENU[$key]}</a></li>";
                }
            ?>
        </ul>

        <h2><?=$MENU['important']; ?></h2>

        <ul>
            <?php
            $class = $ACTIVE_MENU == 'tos' ? "active" : "";
            ?>
            <li class="<?=$class;?>">
                <a href="/tos.<?=$LANG;?>.<?=getenv('LINK_EXT');?>"><?=$MENU['tos']; ?></a>
            </li>
            
            <?php
            $class = $ACTIVE_MENU == 'privacy-policy' ? "active" : "";
            ?>
            <li class="<?=$class;?>">
                <a href="/privacy-policy.<?=$LANG;?>.<?=getenv('LINK_EXT');?>"><?=$MENU['privacy-policy']; ?></a>
            </li>
        </ul>
    </div>

    <div class="content">
        <?=$CONTENT; ?>
    </div>
</div>


<div id="image-popup" class="popup">
    <span class="close-btn">&times;</span>
    <img class="popup-content" id="popup-image" />
</div>


<script src="/includes/layout.js"></script>
<script src="/includes/popup.js"></script>

<?php
if (isset($JS)) {
    foreach ($JS as $js) {
        echo "<script src='$js?" . time() . "'></script>";
    }
}
?>
</body>
</html>
