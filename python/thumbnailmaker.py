from PIL import Image
import os
import mimetypes
import requests
import fitz

def generate_thumbnail(file_path, thumbnail_path):
    file_extension = os.path.splitext(file_path)[1].lower()

    if file_extension in ['.jpg', '.jpeg', '.png', '.gif']:
        image = Image.open(file_path)
        image.thumbnail((200, 150))
        image.save(thumbnail_path)
    elif file_extension == '.pdf':
        doc = fitz.open(file_path)
        if doc.page_count > 0:
            page = doc.load_page(0)
            pix = page.get_pixmap(matrix=fitz.Matrix(200 / 72, 150 / 72))
            image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            image.save(thumbnail_path)
        else:
            # If PDF conversion failed, generate a placeholder thumbnail
            placeholder = Image.new('RGB', (200, 150), color='gray')
            placeholder.save(thumbnail_path)
    if file_extension == '':
        # For YouTube videos, extract the video ID and generate a thumbnail using the YouTube Data API
        video_id = extract_video_id(file_path)
        generate_youtube_thumbnail(video_id, thumbnail_path)

    else:
        # For other file types, generate a placeholder thumbnail
        placeholder = Image.new('RGB', (200, 150), color='gray')
        placeholder.save(thumbnail_path)

def extract_video_id(url):
    # Extract the YouTube video ID from the URL
    video_id = None
    if "youtube.com" in url:
        video_id = url.split("v=")[1]
    elif "youtu.be" in url:
        video_id = url.split("/")[-1]
    print(video_id)
    return video_id

def generate_youtube_thumbnail(video_id, thumbnail_path):
    # Make a request to the YouTube Data API to get video details
    api_key = "AIzaSyCcIMv4hdu6aJzR0H6K2qH4cwY093LZFUw"  # Replace with your own YouTube Data API key
    video_info_url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video_id}&key={api_key}"
    response = requests.get(video_info_url)
    print(response)
    data = response.json()

    # Extract the thumbnail URL from the API response
    if "items" in data and len(data["items"]) > 0:
        thumbnail_url = data["items"][0]["snippet"]["thumbnails"]["high"]["url"]

        # Download the thumbnail image
        image_response = requests.get(thumbnail_url)
        image_data = image_response.content

        # Save the thumbnail image
        with open(thumbnail_path, "wb") as f:
            f.write(image_data)

        print("Thumbnail generated successfully.")
    else:
        print("Failed to fetch video details from YouTube Data API.")

# Usage example
file_path = 'https://youtu.be/SB0rNXOgY6I'
thumbnail_path = './thumbnail.jpg'
generate_thumbnail(file_path, thumbnail_path)



# print("Hello world")