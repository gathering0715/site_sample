import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, urlsplit

# 디렉토리 생성 함수
def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

# 파일 저장 함수
def save_file(url, content, base_folder, relative_path):
    folder = os.path.join(base_folder, os.path.dirname(relative_path))
    ensure_directory(folder)  # 디렉토리 생성
    file_path = os.path.join(base_folder, relative_path)
    with open(file_path, 'wb') as file:
        file.write(content)

# 상대 경로 생성 함수 (HTML 구조에 맞춤)
def get_relative_path(url, base_url):
    parsed_url = urlparse(url)
    base_parsed = urlparse(base_url)
    if parsed_url.netloc != base_parsed.netloc:
        return None  # 외부 리소스 무시
    path = parsed_url.path.lstrip("/")
    if not path or path.endswith("/"):
        path += "index.html"  # 디렉토리 경로는 index.html로 저장
    return path

# 특정 페이지 크롤링 함수
def crawl_visible_resources(target_url, output_folder):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        }
        response = requests.get(target_url, headers=headers)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Failed to fetch {target_url}: {e}")
        return

    content_type = response.headers.get("Content-Type", "")
    if "text/html" in content_type:
        soup = BeautifulSoup(response.text, "lxml")

        # HTML 저장
        html_relative_path = get_relative_path(target_url, target_url)
        if html_relative_path:
            save_file(target_url, response.content, output_folder, html_relative_path)

        # CSS, JS, 이미지 파일 다운로드
        for tag, attr in [("link", "href"), ("script", "src"), ("img", "src")]:
            for element in soup.find_all(tag):
                file_url = element.get(attr)
                if file_url:
                    file_url = urljoin(target_url, file_url)  # 절대 URL로 변환
                    relative_path = get_relative_path(file_url, target_url)
                    if relative_path:  # 외부 리소스 무시
                        try:
                            file_response = requests.get(file_url, headers=headers)
                            file_response.raise_for_status()

                            # 파일 저장
                            save_file(file_url, file_response.content, output_folder, relative_path)
                        except requests.RequestException as e:
                            print(f"Failed to fetch resource {file_url}: {e}")

# 실행
def main():
    target_url = "https://heyjapan.co.kr"  # 크롤링할 특정 페이지
    output_folder = "output"  # 저장할 폴더
    crawl_visible_resources(target_url, output_folder)

if __name__ == "__main__":
    main()
