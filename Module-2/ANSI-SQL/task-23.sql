USE event_management;

SELECT
    DATE_FORMAT(registration_date, '%Y-%m') AS month,
    COUNT(*) AS registration_count
FROM Registrations
GROUP BY DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY month;