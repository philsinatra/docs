# htaccess

## Authentication

```apache
<IfModule mod_authn_file.c>
      AuthName "Username and password required"
      AuthType Basic
      AuthUserFile /vservers/absolute/path/to/.htpasswd
      <Limit GET POST>
            Require valid-user
      </Limit>
</IfModule>
```

### Users

To add a user to an existing .htpasswd file, use the `htpasswd` command without the `-c` parameter:

```apache
htpasswd .htpasswd membertwo
New password:
Re-type new password:
Adding password for user membertwo
```

Adjust the `require` line of the `.htaccess` file to account for the new user:

```apache
Require user originaluser membertwo
```

## Mime Type Support

Some common MIME Types:

| File Type | MIME Type | Web Control Usage |
|----------|--------|----------|
| .vtt | text/vtt | Video Player Web Control |
| .srt | text/srt | Video Player Web Control |
| .xml | text/xml | Video Player Web Control |
| .aac | audio/aac | Audio Player Web Control |
| .oga | audio/ogg | Audio Player Web Control |
| .mp3 | audio/mpeg | Audio Player Web Control |
| .mp4 | video/mp4 | Video Player Web Control |
| .m4v | video/x-m4v | Video Player Web Control |
| .webm | video/webm | Video Player Web Control |
| .ogv | video/ogg | Video Player Web Control |
| .flv | video/x-flv | Video Player Web Control |
| .mov | video/quicktime | Quicktime Movie Web Control |
| .m4v | video/x-f4v | Video Player Web Control |
| .m4a | video/mp4 | Audio Player Web Control |
| .svg | image/svg+xml | SVG Graphics |
| .json | application/json | JSON Data |
| .ttml | application/ttml+xml | Video Player Web Control |

Example configuration:

```apache
AddType image/svg+xml .svg
AddType video/ogg .ogv .ogg
AddType video/webm .webm
AddType video/x-m4v .m4v
AddType video/mp4 .mp4
AddType application/json .json
```

## GZIP Compression

```apache
# BEGIN GZIP
<ifmodule mod_deflate.c>
AddOutputFilterByType DEFLATE text/text text/html text/plain text/xml text/css application/x-javascript application/javascript
</ifmodule>
# END GZIP
```

- [source article](https://css-tricks.com/snippets/htaccess/active-gzip-compression/)
- [test utility](http://www.whatsmyip.org/http-compression-test/)

## Leverage Browser Caching

```apache
## EXPIRES CACHING ##
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/x-javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
  ExpiresByType application/x-shockwave-flash "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresDefault "access plus 2 days"
</IfModule>
## EXPIRES CACHING ##
```

