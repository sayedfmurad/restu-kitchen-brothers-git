from TikTokApi import TikTokApi

# create an instance of the TikTokApi
api = TikTokApi.get_instance()

# authenticate yourself with TikTok
api.login(username="your_username", password="your_password")
# create a video object
video_data = api.upload_video("path/to/your/video.mp4", watermarked=True)
# post the video to TikTok
api.post_video(video_data['upload_id'], caption="your_caption")
