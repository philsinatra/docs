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

## Mime Type Support

```
AddType image/svg+xml .svg
AddType video/ogg .ogv .ogg
AddType video/webm .webm
AddType video/x-m4v .m4v
AddType video/mp4 .mp4
```