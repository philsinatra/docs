# Unix File Permissions

```bash
chown root filename
chgrp root filename
chmod 777 filename
# change user:group in one line
chown user:group filename
```

## Change permissions to all sub files

```bash
# goto content area
cd /var/www/vhosts/xxxxx.com/
# change to owned by nobody user:group
chown -R nobody:nobody .
# correct permissions all files at current directory and below
find . -type f -exec chmod 664 {} \;
# correct permissions all directories at current directory and below
find . -type d -exec chmod 775 {} \;
```
