from aiosql import from_path
from sqlite3 import connect
from uuid import uuid1


class SQLiteIO:
    def __init__(self, DATABASE_PATH, QUERY_FILE_PATH, DATABASE_TYPE) -> None:
        self.__DATABASE_PATH = DATABASE_PATH
        self.__QUERY_FILE_PATH = QUERY_FILE_PATH
        self.__DATABASE_TYPE = DATABASE_TYPE
        self.__QUERY = from_path(self.__QUERY_FILE_PATH, self.__DATABASE_TYPE)
        self.__create_db()

    def __create_db(self) -> None:
        with connect(self.__DATABASE_PATH) as conn:
            self.__QUERY.create_table(conn)

    def insert_file(self, full_file_path: str, schedule_time: float) -> None:
        with connect(self.__DATABASE_PATH) as conn:
            self.__QUERY.insert_filedata(
                conn,
                id=uuid1().int >> 90,
                file_path=full_file_path,
                schedule_time=schedule_time,
            )

    def get_expired_files(self, current_time: float) -> list:
        with connect(self.__DATABASE_PATH) as conn:
            files_list = self.__QUERY.fetch_filedata(conn, current_time=current_time)
            return files_list

    def delete_expired_files(self, files: list) -> None:
        with connect(self.__DATABASE_PATH) as conn:
            self.__QUERY.delete_filedata(conn, files)
