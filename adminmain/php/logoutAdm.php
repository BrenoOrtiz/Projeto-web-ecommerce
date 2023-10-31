<?php

session_start();  // Retomar a session existente

session_destroy();  // Apagar session do Admin

echo json_encode('Admin deslogado');

?>