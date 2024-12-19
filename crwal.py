import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# 디렉토리 생성 함수
def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

# 파일 저장 함수
def save_file(content, base_folder, relative_path):
    folder = os.path.join(base_folder, os.path.dirname(relative_path))
    ensure_directory(folder)
    file_path = os.path.join(base_folder, relative_path)
    with open(file_path, 'wb') as file:
        file.write(content)

# 상대 경로 생성 함수 (HTML 구조에 맞춤)
def get_relative_path(url, base_url):
    parsed_url = urlparse(url)
    base_parsed = urlparse(base_url)
    if parsed_url.netloc and parsed_url.netloc != base_parsed.netloc:
        return None  # 외부 리소스 무시
    path = parsed_url.path.lstrip("/")
    if not path or path.endswith("/"):
        path += "index.html"  # 디렉토리 경로는 index.html로 저장
    return path

# HTML 파일 수정 및 저장 함수
def save_html_with_updated_paths(html_content, target_url, output_folder):
    soup = BeautifulSoup(html_content, 'lxml')

    # 경로를 상대 경로로 변경
    for tag, attr in [("script", "src"), ("img", "src"), ("link", "href")]:
        for element in soup.find_all(tag):
            url = element.get(attr)
            if url:
                new_url = urljoin(target_url, url)  # 절대 URL로 변환
                relative_path = get_relative_path(new_url, target_url)
                if relative_path:
                    element[attr] = f"./{relative_path}"

    # HTML 저장
    relative_path = get_relative_path(target_url, target_url) or "index.html"
    file_path = os.path.join(output_folder, relative_path)
    ensure_directory(os.path.dirname(file_path))  # 디렉토리 생성
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(soup.prettify())
    print(f"Saved HTML with updated paths: {file_path}")

# 특정 페이지에서 리소스 크롤링 함수
def crawl_page(target_url, output_folder):
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
        # HTML 파일 저장
        save_html_with_updated_paths(response.text, target_url, output_folder)

        # 이미지 파일 다운로드
        soup = BeautifulSoup(response.text, "lxml")
        for element in soup.find_all("img"):
            img_url = element.get("src")
            if img_url:
                img_url = urljoin(target_url, img_url)  # 절대 URL로 변환
                relative_path = get_relative_path(img_url, target_url)
                if relative_path:  # 외부 리소스 무시
                    try:
                        img_response = requests.get(img_url, headers=headers)
                        img_response.raise_for_status()

                        # 파일 저장
                        save_file(img_response.content, output_folder, relative_path)
                        print(f"Saved image: {img_url}")
                    except requests.RequestException as e:
                        print(f"Failed to fetch image {img_url}: {e}")

        # CSS 파일 다운로드 및 폰트 크롤링
        for element in soup.find_all("link", rel="stylesheet"):
            css_url = element.get("href")
            if css_url:
                css_url = urljoin(target_url, css_url)  # 절대 URL로 변환
                try:
                    css_response = requests.get(css_url, headers=headers)
                    css_response.raise_for_status()

                    # CSS 파일 저장
                    relative_path = get_relative_path(css_url, target_url)
                    if relative_path:
                        save_file(css_response.content, output_folder, relative_path)
                        print(f"Saved CSS: {css_url}")

                    # 폰트 파일 다운로드
                    for line in css_response.text.splitlines():
                        if "url(" in line:
                            start = line.find("url(") + 4
                            end = line.find(")", start)
                            if start != -1 and end != -1:
                                font_url = line[start:end].strip('"\'')
                                font_url = urljoin(css_url, font_url)
                                font_relative_path = get_relative_path(font_url, target_url)
                                if font_relative_path:
                                    try:
                                        font_response = requests.get(font_url, headers=headers)
                                        font_response.raise_for_status()
                                        save_file(font_response.content, output_folder, font_relative_path)
                                        print(f"Saved font: {font_url}")
                                    except requests.RequestException as e:
                                        print(f"Failed to fetch font {font_url}: {e}")
                except requests.RequestException as e:
                    print(f"Failed to fetch CSS file {css_url}: {e}")

# 실행
def main():
    target_url = "https://heyjapan.co.kr/deal/deail?url=B0B3R5PL2Y&shop_id=amazon_jp"  # 크롤링할 특정 페이지
    output_folder = "output"  # 저장할 폴더
    crawl_page(target_url, output_folder)

if __name__ == "__main__":
    main()
