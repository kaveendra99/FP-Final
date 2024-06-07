-- name: create_table#
-- Create file_data table
CREATE TABLE
IF NOT EXISTS file_data
(
  id INT PRIMARY KEY NOT NULL,
  file_path TEXT NOT NULL,
  schedule_time FLOAT NOT NULL
);

-- name: insert_filedata!
INSERT INTO file_data
  (
  id,
  file_path,
  schedule_time
  )
VALUES
  (
    :id,
    :file_path,
    :schedule_time
);

-- name: fetch_filedata
SELECT id, file_path
FROM file_data
WHERE schedule_time <= :current_time;

-- name: delete_filedata*!
DELETE FROM file_data WHERE id = :id;
