<?php

session_start();  // Retomar a session existente

session_destroy();  // Apagar session do user

echo json_encode('Usuario deslogado');

?>