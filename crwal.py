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

def extract_images_from_css(css_content, css_url, base_url):
    image_urls = []
    for line in css_content.splitlines():
        if "url(" in line:
            start = line.find("url(") + 4
            end = line.find(")", start)
            if start != -1 and end != -1:
                image_url = line[start:end].strip('"\'"')
                image_url = urljoin(css_url, image_url)
                if get_relative_path(image_url, base_url):
                    image_urls.append(image_url)
    return image_urls

# 특정 페이지에서 이미지 크롤링 함수
def crawl_images(target_url, output_folder):
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

        # 이미지 파일 다운로드
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
                        save_file(img_url, img_response.content, output_folder, relative_path)
                        print(f"Saved image: {img_url}")
                    except requests.RequestException as e:
                        print(f"Failed to fetch image {img_url}: {e}")

        # CSS 파일에서 이미지 추출 및 다운로드
        for element in soup.find_all("link", rel="stylesheet"):
            css_url = element.get("href")
            if css_url:
                css_url = urljoin(target_url, css_url)  # 절대 URL로 변환
                try:
                    css_response = requests.get(css_url, headers=headers)
                    css_response.raise_for_status()

                    # CSS 파일에서 이미지 URL 추출
                    css_images = extract_images_from_css(css_response.text, css_url, target_url)
                    for img_url in css_images:
                        relative_path = get_relative_path(img_url, target_url)
                        if relative_path:  # 외부 리소스 무시
                            try:
                                img_response = requests.get(img_url, headers=headers)
                                img_response.raise_for_status()

                                # 파일 저장
                                save_file(img_url, img_response.content, output_folder, relative_path)
                                print(f"Saved CSS image: {img_url}")
                            except requests.RequestException as e:
                                print(f"Failed to fetch CSS image {img_url}: {e}")
                except requests.RequestException as e:
                    print(f"Failed to fetch CSS file {css_url}: {e}")
# 실행
def main():
    target_url = "https://heyjapan.co.kr/"  # 크롤링할 특정 페이지
    output_folder = "output"  # 저장할 폴더
    crawl_images(target_url, output_folder)

if __name__ == "__main__":
    main()
