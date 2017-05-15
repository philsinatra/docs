# ffmpeg

Batch convert example:

for f in *.wmv;
  do
    ffmpeg -i "$f" -s 640x360 "${f%.*}.mp4";
done