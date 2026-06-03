USE event_management;

SELECT
    user_id,
    full_name,
    email,
    city
FROM Users
WHERE user_id NOT IN
(
    SELECT DISTINCT user_id
    FROM Registrations
    WHERE registration_date >= CURRENT_DATE - INTERVAL 90 DAY
);