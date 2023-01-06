INSERT INTO `notifications` (`id`, `user_id`, `notification_type`, `temperature_notification`, `wind_speed_notification`, `rain_gauge_notification`, `wind_direction_notification`, `humidity_notification`, `pressure_notification`, `soil_temperature_notification`, `soil_mosture_notification`, `text_notification`, `active_notification`, `compare_operator`, `description_notification`, `notification_sent`) VALUES
(238, 28, 'temperature', 222222, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'dsfdsfdsf', 1, '>', 'ssdfsdfds', 0),
(239, 28, 'pressure', NULL, NULL, NULL, NULL, NULL, 2222222, NULL, NULL, 'fsdfsdfsdfsdf', 1, '>', 'sdfdsd', 0),
(240, 28, 'windDirection', NULL, NULL, NULL, '5', NULL, NULL, NULL, NULL, 'dsfdsfdsfdsfsd', 1, '>', 'fdsfsdfdsfds', 0),
(241, 28, 'rainGauge', NULL, NULL, 1111111, NULL, NULL, NULL, NULL, NULL, 'fdsfsd', 1, '>', 'dsafdsfsdfds', 0),
(242, 28, 'humidity', NULL, NULL, NULL, NULL, 333333, NULL, NULL, NULL, 'fsdfsdfsdfsdfsd', 1, '>', 'dfdsfdsfdfd', 0),
(243, 28, 'soilMosture', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3135555, 'sdffsdfsdfsdfsdfdss', 1, '>', 'sdfdsfdsfdsfdss', 0),
(245, 28, 'windSpeed', NULL, 111111, NULL, NULL, NULL, NULL, NULL, NULL, 'fsddsfsdfsdfds', 1, '>', 'sdfdsfdsfds', 0);

/* import because of testing */