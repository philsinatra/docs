## Authentication

```
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

```
htpasswd .htpasswd membertwo
New password:
Re-type new password:
Adding password for user membertwo
```

Adjust the `require` line of the `.htaccess` file to account for the new user:

```
Require user originaluser membertwo
```

## Mime Type Support

```
AddType image/svg+xml .svg
AddType video/ogg .ogv .ogg
AddType video/webm .webm
AddType video/x-m4v .m4v
AddType video/mp4 .mp4
```