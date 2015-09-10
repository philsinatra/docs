# Edit the OSX Hosts File

- [make use of](http://www.makeuseof.com/tag/how-to-edit-the-mac-os-x-hosts-file-and-why-you-might-want-to/#makingchanges)

The hosts file is used to route hostnames including website addresses to IP addresses. If an existing domain is added to this file along with an IP, it will call on that IP rather than where the domain name normally points. There are a range of uses, though the vast majority involve security, blocking hostnames and preventing connections being made.

As an example, web developers often have to use this file to access developer servers which aren’t tied to a domain. By pointing a domain or sub-domain like “mysite1.mysite.com” to the IP at which the development site is located it is easier to access the site. This also helps prevent the rest of the web accessing that server easily.

Another example would be to block access to a domain, so when a website redirects you to an adserver or partner site, you could block that site by adding a line in your hosts file which redirects the IP to your local machine (127.0.0.1). Of course, this only provides a loose safety net as advertisers, spammers, malware distributors and anyone else you might want to keep out are wise.

## Making Changes

```bash
sudo nano /etc/hosts
```

When prompted, type in your administrator password and hit Enter.

Users on Mac OS X 10.6 or earlier will find the file in the `/private/etc/hosts` location instead.

Rules should be added in the following format: `<IP address> <hostname>`, for example: adding `127.0.0.1 google.com` would redirect all google.com requests (but not www.google.com requests) to your local machine, essentially blocking your machine from accessing Google’s servers.

In the event that your changes don’t register immediately you can flush your DNS by opening Terminal and entering the following:

```bash
sudo killall -HUP mDNSResponder
```

