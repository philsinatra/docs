# SSH Into a Particular Directory

Basic functionality:

```bash
ssh user@remote-system
cd <some-directory>
```

The following command will automatically `cd` into a directory called _dir1_ after SSH into a remote system (in this example 192.168.225.52).

```bash
ssh -t user@192.168.225.52 'cd /home/subdirectory/dir1 ; bash'
```

The above command will SSH into a remote system (192.168.225.52) and immediately cd into a directory named `‘/home/subdirectory/dir1’` directory and finally leave you at the remote system’s shell.

Here, the `-t` flag is used to force pseudo-terminal allocation, which is necessary for an interactive shell. If you don’t specify this flag, then no prompt will appear. And also if you don’t add `” bash”` at the end of the above command, the connection will get terminated and return control to the local system.

## Reference

- [How to SSH Into a Particular Directory on Linux](https://tinyurl.com/y9t6s4wk)
