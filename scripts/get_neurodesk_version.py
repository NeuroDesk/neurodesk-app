from urllib.request import urlopen
import os

REPOSITORY = "neurodesk.github.io"
ORGANIZATION = "NeuroDesk"


def find_latest_stable(owner, repository):
    currentVersion = ''
    currentToml = os.path.join(os.path.dirname(__file__), '..', 'neurodesktop.toml')
    with open(currentToml, 'r') as f:
        for line in f:
            if 'jupyter_neurodesk_version' in line:
                currentVersion = line.split('=')[1].split('"')[1]
            
    """Find latest stable release on GitHub for given repository."""
    endpoint = f"https://raw.githubusercontent.com/{owner}/{repository}/main/data/neurodesktop.toml"
    releases = urlopen(endpoint)
    for release in releases:
        if 'jupyter_neurodesk_version' not in str(release):
            continue
        version = str(release).split('=')[1].split('"')[1]
        return version if version != currentVersion else ''

if __name__ == '__main__':   
    print(find_latest_stable(owner=ORGANIZATION, repository=REPOSITORY))