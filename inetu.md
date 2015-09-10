# iNETU Hosting

To initialize root level access to your user:

```bash
sudo -i
```

Error logs: 
```bash
cd /var/log/httpd/
```

php.ini
```bash
cd /etc/php.ini
```

Update `php.ini` to handle more SQL injections:

```ini
max_input_vars = 3000
```
