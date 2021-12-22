# macOS Watch Unlock Mac Bug Fix 🐛

## Mac ➡️ Apple Watch Auto Unlock 🐛

After having to re-pair my Apple Watch to my iPhone, I lost the ability to auto unlock my Macbook Pro with my Apple Watch. After spending a few hours trying all the bullshit solutions in the tech blogs (none of which worked obviously), I stumbled on [this post on Apple's discussion board](https://discussions.apple.com/thread/251803595?login=true&page=15) that worked like a charm.

### Hardware/Software Specifics

- Apple Watch Series 5 / watchOS 7.1
- Macbook Pro (2018) / macOS 10.15.7 (Catalina)

### Fix Procedure

1. Open "Keychain Access"
1. In "View", enable "Show Invisible Items"
1. Search for "Auto Unlock"
1. You should see a whole bunch of application passwords for "Auto Unlock: XXXX's ..."
1. Select all records and delete (this will reset/disable auto unlock on other Macs if you use multiple Macs)
1. Whilst still in "Keychain Access", search for "AutoUnlock" (no space)
1. There should be 4 entries for "tlk" "tlk-nonsync" "classA" "classC"
1. Select 4 records and delete (don't worry if they re-appear, the system repairs this automatically)
1. Open "Finder" and navigate to "~/Library/Sharing/AutoUnlock"
1. There should be two files "ltk.plist" and "pairing-records.plist"
1. Delete both files
1. Open "System Preferences" and try enabling auto unlock. You may need to enable it twice, the first attempt will fail.

The first attempt to re-enable the preference did fail, but the second attempt worked immediately.
