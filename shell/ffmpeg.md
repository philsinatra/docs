# FFMPEG

Batch convert example:

```bash
for f in .wmv; do ffmpeg -i "$f" -s 640x360 "${f%.}.mp4"; done
```

Fix height/width divisible by 2 error:

```bash
ffmpeg -i input.avi -filter:v scale=720:-1 -c:a copy output.avi

# height @720 example
scale="trunc(oh*a/2)*2:720"

# width @1280 example
scale="1280:trunc(ow/a/2)*2"
```

[Superuser Reference](https://superuser.com/questions/624563/how-to-resize-a-video-to-make-it-smaller-with-ffmpeg)
