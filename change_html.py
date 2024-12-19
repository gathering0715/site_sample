import os
from bs4 import BeautifulSoup

# 현재 디렉토리
current_directory = os.getcwd()

# 디렉토리 내 모든 HTML 파일 검색
for file_name in os.listdir(current_directory):
    if file_name.endswith(".html"):
        file_path = os.path.join(current_directory, file_name)

        # HTML 파일 읽기
        with open(file_path, "r", encoding="utf-8") as file:
            soup = BeautifulSoup(file, "html.parser")

        # 모든 a 태그에서 href 수정
        modified = False
        for a_tag in soup.find_all("a", href=True):
            if a_tag["href"].startswith("/deal/"):
                a_tag["href"] = "./deal"  # "/deal/" 뒤의 모든 내용 삭제
                modified = True

        # 수정된 내용 저장
        if modified:
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(str(soup))
            print(f"{file_name} 파일이 수정되었습니다.")
        else:
            print(f"{file_name} 파일에 수정할 내용이 없습니다.")
