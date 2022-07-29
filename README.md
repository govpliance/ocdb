# ATO Pathways

[![Docker Repository on Quay](https://quay.io/repository/redhatgov/ocdb/status "Docker Repository on Quay")](https://quay.io/repository/redhatgov/ocdb)

## Quick Demo
  * run demo in container
  ```
  podman run -it -p "3000:3000" quay.io/redhatgov/ocdb
  ```
  * point your browser to [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Developer Setup
| | Fedora | OSX |
|:-|:-|:-|
| Install Golang and Libxml2 | `dnf install golang libxml2-devel` | `brew install golang libxml2 libxslt` |
| Aquire ocdb | `go get -u -v github.com/govpliance/ocdb` | `git clone git@github.com:govpliance/ocdb.git` |
| Change dir to source | `cd ~/go/src/github.com/Govpliance/ocdb` | `cd ocdb` |
| Aquire buffalo tool | `go get -v github.com/gobuffalo/buffalo/buffalo` | `brew install gobuffalo/tap/buffalo` |
| Build front-end pipeline | `dnf install -y npm && npm install -g yarn && yarn install` | `brew install npm && npm install -g yarn && yarn install` |
| Run server | `buffalo dev` | `buffalo dev` |
| View app | [http://127.0.0.1:3000](http://127.0.0.1:3000) | [http://127.0.0.1:3000](http://127.0.0.1:3000) |


  * install golang `dnf install golang libxml2-devel`
  * acquire ocdb - `go get -u -v github.com/RedHatGov/ocdb`
  * change dir to the source location - `cd ~/go/src/github.com/RedHatGov/ocdb`
  * acquire buffallo tool - `go get -v github.com/gobuffalo/buffalo/buffalo`
    * optionally consider installing bash completion: https://gobuffalo.io/en/docs/getting-started/integrations
  * build front-end pipeline
    * install npm `dnf install -y npm`
    * install yarn `npm install -g yarn`
    * install frontend dependencies `yarn install`
  * run server `buffalo dev`
  * point your browser to [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Developer Links
  * [Patternfly 4 documentation](https://patternfly-react.surge.sh/) or [slightly different version](https://www.patternfly.org/v4/documentation/react/overview/release-notes)

## Deployment info

How to pull new version manually in openshift?

```
    oc import-image ocdb
```
